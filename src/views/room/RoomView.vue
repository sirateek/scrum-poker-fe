<template>
  <div class="mx-8">
    <!-- Display -->
    <div class="flex flex-row max-h-[65vh]">
      <div
        class="grid grid-cols-[repeat(auto-fit,14%)] justify-center items-center w-full gap-4 overflow-y-scroll"
      >
        <CardWithName
          v-for="i in 20"
          :key="i"
          :value="i.toString()"
          name="TonnamTest"
        ></CardWithName>
      </div>
      <div class="flex flex-row gap-2">
        <InformationBoard title="Score Board">
          <div v-for="i in 20" :key="i">
            <div class="flex flex-row">
              <Card :value="i.toString()" text-size="text-md"></Card>
              <p class="ml-1 flex items-center justify-center">x {{ i }}</p>
            </div>
            <VDivider class="mt-2"></VDivider>
          </div>
          <div class="flex flex-row">
            <Card value="?" text-size="text-md"></Card>
            <p class="ml-1 flex items-center justify-center">x 5</p>
          </div>
          <VDivider class="mt-2"></VDivider>
        </InformationBoard>

        <InformationBoard title="Player">
          <div class="w-full flex flex-col gap-2 justify-start">
            <div class="flex flex-row">
              <div>
                <VIcon icon="mdi-eye"></VIcon>
                Spectator
              </div>
              <VSpacer></VSpacer>
              <div>5</div>
            </div>
            <VDivider></VDivider>
          </div>

          <div
            v-for="i in 15"
            :key="i"
            class="w-full flex flex-col gap-2 justify-start"
          >
            <div class="flex flex-row">
              <div>
                <VIcon icon="mdi-account"></VIcon>
                Tonnam
              </div>
              <VSpacer></VSpacer>
              <div>
                <VIcon icon="mdi-check"></VIcon>
              </div>
            </div>
            <VDivider></VDivider>
          </div>
        </InformationBoard>
      </div>
    </div>

    <!-- Hand -->
    <div class="h-[25vh] w-full flex flex-col">
      <HandAction></HandAction>
    </div>
  </div>
</template>
≈
<script lang="ts">
import { defineComponent } from "vue";
import CardWithName from "./components/CardWithName.vue";
import Card from "@/components/Card.vue";
import HandAction from "@/views/room/components/HandAction.vue";
import InformationBoard from "./components/InformationBoard.vue";
import { gql } from "@apollo/client";
import { useQuery } from "@vue/apollo-composable";
import { Query } from "@/graphql/generated/graphql";

export default defineComponent({
  name: "RoomView",
  components: {
    Card,
    HandAction,
    CardWithName,
    InformationBoard,
  },
  setup() {
    const queryTest = gql`
      {
        getAvailableDecks {
          Name
          Cards {
            Index
            DisplayValue
          }
        }
      }
    `;

    const { result, variables } = useQuery<Query, Query>(queryTest, {});

    console.log(result.value?.getAvailableDecks);
  },
});
</script>
