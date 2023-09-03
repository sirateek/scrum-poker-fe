<template>
  <v-layout>
    <VAppBar>
      <VAppBarTitle class="text-left">Poker Perkoke</VAppBarTitle>
      <VSpacer></VSpacer>
      <v-menu
        location="bottom"
        content-class="rounded-xl"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="rounded-pill">
            <VIcon icon="mdi-account"></VIcon>
            <p
              class="ml-3 normal-case max-w-screen-sm text-ellipsis overflow-hidden"
            >
              Giggy
            </p>
          </v-btn>
        </template>
      </v-menu>
    </VAppBar>

    <v-main class="mt-2">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EventKey, eventBusFactory } from "@/utils/EventBusFactory";
import { socketProvider } from "@/utils/SocketProvider";
import router from "@/router";

export default defineComponent({
  name: "MainLayout",
  setup() {
    socketProvider;

    const onServerConnected = () => {
      console.log("Server Connected");
    };

    const onServerDisconnected = () => {
      router.push({
        name: "ServerDisconnected",
      });
    };
    eventBusFactory.eventBus.on(
      EventKey.ServerDisconnected,
      onServerDisconnected
    );

    eventBusFactory.eventBus.on(EventKey.ServerConnected, onServerConnected);

    return {
      onServerConnected,
      onServerDisconnected,
    };
  },
  beforeUnmount() {
    eventBusFactory.eventBus.off(
      EventKey.ServerConnected,
      this.onServerConnected
    );
    eventBusFactory.eventBus.off(
      EventKey.ServerDisconnected,
      this.onServerDisconnected
    );
  },
});
</script>
