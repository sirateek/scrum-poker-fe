<template>
  <div class="justify-center">
    <v-icon icon="mdi-sign-caution" size="100" color="yellow"></v-icon>
    <h1>Server Disconnected</h1>
    <h2 v-if="socketProvider.getDisconnectReason() != ''">
      A Poker Server is disconnected with this reason
      {{ socketProvider.getDisconnectReason() }}
    </h2>
    <h2 v-else>A Poker Server is disconnected without providing a reason.</h2>
    <div class="mt-5">
      <div v-if="!attributes.isReconnecting">
        <v-btn @click="onReconnect">Reconnect</v-btn>
      </div>
      <div v-else>
        <v-progress-circular indeterminate :width="7"></v-progress-circular>
      </div>
    </div>
  </div>

  <DialogBox :attribute="dialogBoxAttribute"></DialogBox>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { socketProvider } from "@/utils/SocketProvider";
import { reactive } from "vue";
import DialogBox from "@/components/dialogbox/DialogBox.vue";
import { useDialogBox } from "@/components/dialogbox/composable/useDialogBox";
import router from "@/router/index";

export default defineComponent({
  name: "ServerDisconnected",
  components: {
    DialogBox,
  },
  setup() {
    const attributes = reactive({
      isReconnecting: false,
    });

    const { dialogBoxAttribute, showDialogBox, dismissDialogBox } =
      useDialogBox();

    const onReconnect = async () => {
      attributes.isReconnecting = true;
      try {
        await socketProvider.connect();
      } catch {
        attributes.isReconnecting = false;
        showDialogBox(
          {
            title: "Connection Failed",
            detail: "Consult the log or administrator.",
          },
          [
            {
              title: "Dismiss",
              onClick: () => {
                dismissDialogBox();
              },
            },
          ],
          false
        );
        return;
      }
      router.replace({
        name: "dashboard",
      });
      attributes.isReconnecting = false;
    };

    return {
      dialogBoxAttribute,
      attributes,
      socketProvider,
      onReconnect,
    };
  },
});
</script>
