import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PageNotFound from "@/views/errors/PageNotFound.vue";
import RoomView from "@/views/room/RoomView.vue";
import ServerDisconnected from "@/views/errors/ServerDisconnected.vue";
import { Layout } from "@/layouts/layout";
import RegisterView from "@/views/player/RegisterView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: HomeView,
  },
  {
    path: "/room",
    name: "room",
    component: RoomView,
  },
  {
    path: "/player/register",
    name: "RegisterView",
    component: RegisterView,
    meta: {},
  },
  {
    path: "/server/disconnected",
    name: "ServerDisconnected",
    component: ServerDisconnected,
    meta: {
      layout: Layout.NonLayout,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
