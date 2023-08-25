import { SpyInstance, vi } from "vitest";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { useSearchableDataTable } from "@/views/contractors/composable/useSearchableDataTable";
import RepositoryFactory from "@/repository/repositoryFactory";
import { AxiosError } from "axios";
import { SearchContractor } from "@/models/contractor/searchContractor";

const defaultSearchAttribute = {
  limit: 10,
  offset: 0,
  approvedWorkTypeUUIDs: [],
  contractorStatus: null,
  editType: null,
  grades: [],
  provinceCodes: [],
  registeredDate: null,
  search: "",
  selectedWorkTypeUUIDs: [],
};

describe("Contractor List Testing", () => {
  describe("useSearchableDataTable testing", () => {
    let mockSearchContractor: SpyInstance;

    beforeEach(() => {
      mockSearchContractor = vi.spyOn(
        RepositoryFactory.instance.contractorRepository,
        "SearchContractor"
      );
    });

    afterEach(() => {
      mockSearchContractor.mockReset();
    });

    it("should contain empty data", () => {
      const { tableAttributes, tableData, getSearchAttribute } =
        useSearchableDataTable();

      expect(tableAttributes.error.isError).false;
      expect(tableAttributes.error.errorMessage).eq("");
      expect(tableAttributes.pagination.currentPage).eq(1);
      expect(tableAttributes.pagination.length).eq(1);
      expect(tableAttributes.search.txtSearch).eq("");

      // Expect Search Attribute
      expect(getSearchAttribute()).toMatchObject(defaultSearchAttribute);

      // Expect Length of data in tableData to be empty
      expect(tableData.items.length).eq(0);
    });

    describe("Searching", () => {
      it("should return empty data if repository return nothing", () => {
        mockSearchContractor.mockImplementation(async (request) => {
          expect(request).toMatchObject(defaultSearchAttribute);

          return {
            hasNext: false,
            offset: 0,
            limit: 0,
            totalNewRegistered: 0,
            totalApproved: 0,
            totalNotApproved: 0,
            totalContractors: 0,
            data: [],
          };
        });

        const { tableAttributes, tableData, search } = useSearchableDataTable();

        search();
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.pagination.currentPage).eq(1);
        expect(tableAttributes.pagination.length).eq(1);
        expect(tableAttributes.error.isError).false;
        expect(tableAttributes.error.errorMessage).eq("");
        expect(tableData.items.length).eq(0);
      });

      it("should set unknown error if the repository throw error", async () => {
        const errorMessage = "An unknown error occurred";
        const errorObj = Error(errorMessage);
        mockSearchContractor.mockRejectedValue(errorObj);

        const { tableAttributes, tableData, search } = useSearchableDataTable();

        await expect(search()).rejects.toEqual(errorObj);
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.error.isError).true;
        expect(tableAttributes.error.errorMessage).eq(errorMessage);
        expect(tableData.items.length).eq(0);
      });

      it("should set error message based on the AxiosError if status not 404", async () => {
        const errorObj = new AxiosError("Some Error", "999");
        mockSearchContractor.mockRejectedValue(errorObj);
        const { tableAttributes, tableData, search } = useSearchableDataTable();

        await expect(search()).rejects.toEqual(errorObj);
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.error.isError).true;
        expect(tableAttributes.error.errorMessage).eq(errorObj.message);
        expect(tableData.items.length).eq(0);
      });

      it("should set error message for 404 status code", async () => {
        const errorObj = new AxiosError("test", "404");
        mockSearchContractor.mockRejectedValue(errorObj);
        const { tableAttributes, tableData, search } = useSearchableDataTable();

        await expect(search()).resolves.toEqual(undefined);
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.error.isError).true;
        expect(tableAttributes.error.errorMessage).eq(
          "The resource you tried to find is not found."
        );
        expect(tableData.items.length).eq(0);
      });

      it("should set the search attribute based on the search txt input", async () => {
        const { tableAttributes, tableData, search, getSearchAttribute } =
          useSearchableDataTable();

        const searchText = "Test Searching";
        tableAttributes.search.txtSearch = searchText;

        mockSearchContractor.mockImplementation(
          async (request: SearchContractor) => {
            expect(request.search).toMatchObject(searchText);

            return {
              hasNext: false,
              offset: 0,
              limit: 0,
              totalNewRegistered: 0,
              totalApproved: 0,
              totalNotApproved: 0,
              totalContractors: 0,
              data: [],
            };
          }
        );

        await expect(search()).resolves.toEqual(undefined);
        expect(getSearchAttribute().search).toEqual(searchText);
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.error.isError).false;
        expect(tableData.items.length).toEqual(0);
        expect(tableAttributes.error.isError).false;
      });
    });

    describe("pagination", () => {
      it("should reset the pagination data if the repository return error", async () => {
        const errorObj = new AxiosError("Some Error", "999");
        mockSearchContractor.mockRejectedValue(errorObj);
        const { tableAttributes, tableData, search } = useSearchableDataTable();

        await expect(search()).rejects.toEqual(errorObj);
        expect(mockSearchContractor).toHaveBeenCalledOnce();
        expect(tableAttributes.error.isError).true;
        expect(tableAttributes.pagination.currentPage).toBe(1);
        expect(tableAttributes.pagination.length).toBe(1);
        expect(tableData.items.length).eq(0);
      });

      // Syntax
      // [
      //  offset,
      //  limit,
      //  totalContractors,
      //  expectedCurrentPage,
      //  expectedPageLength
      // ]
      const testCasesForPagination = [
        [0, 10, 49, 1, 5],
        [20, 10, 100, 3, 10],
        [101, 10, 100, 10, 10],
        [-10, 10, 100, 1, 10],
        [0, 0, -10, 1, 1],
      ];

      it.each(testCasesForPagination)(
        "should set the pagination data correctly \n(offset: %s,limit: %s,totalContractors: %s,expectedCurrentPage: %s,expectedPageLength: %s)",
        async (
          offset,
          limit,
          totalContractors,
          expectedCurrentPage,
          expectPageLength
        ) => {
          mockSearchContractor.mockResolvedValue({
            hasNext: true,
            offset: offset,
            limit: limit,
            totalNewRegistered: 0,
            totalApproved: 0,
            totalNotApproved: 0,
            totalContractors: totalContractors,
            data: [],
          });

          const { tableAttributes, search } = useSearchableDataTable();

          await expect(search()).resolves.toBe(undefined);
          expect(mockSearchContractor).toHaveBeenCalledOnce();
          expect(tableAttributes.error.isError).false;
          expect(tableAttributes.pagination.currentPage).toBe(
            expectedCurrentPage
          );
          expect(tableAttributes.pagination.length).toBe(expectPageLength);
        }
      );
    });
  });
});
