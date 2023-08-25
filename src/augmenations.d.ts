import { Layout } from "./layouts/layout";
import { BreadcrumbsItem } from "./layouts/main_layout/components/CustomizedBreadCrumbs.vue";

// Ensure this file is parsed as a module regardless of dependencies.
export {};

declare module "vue-router" {
  interface RouteMeta {
    displayTitle?: string;
    breadcrumbs?: Array<BreadcrumbsItem>;
    layout?: Layout;
    requiresAuth?: boolean;
  }
}
