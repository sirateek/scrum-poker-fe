<template>
  <v-icon icon="mdi-sign-caution" size="100" color="yellow"></v-icon>
  <h1>Server Disconnected</h1>
  <h2 v-if="socketProvider.getDisconnectReason() != ''">
    A Poker Server is disconnected with this reason
    {{ socketProvider.getDisconnectReason() }}
  </h2>
  <h2 v-else>A Poker Server is disconnected without providing a reason.</h2>

  <div class="mt-5">
    <v-btn>Reconnect</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socketProvider } from "@/utils/SocketProvider";

export default defineComponent({
  name: "ServerDisconnected",
  setup() {
    return {
      socketProvider,
    };
  },
});
</script>
