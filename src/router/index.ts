import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import PageNotFound from "@/views/errors/PageNotFound.vue";
import RoomView from "@/views/room/RoomView.vue";
import ServerDisconnected from "@/views/errors/ServerDisconnected.vue";

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
    path: "/server/disconnected",
    name: "ServerDisconnected",
    component: ServerDisconnected,
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
