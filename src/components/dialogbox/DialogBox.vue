<template>
  <v-dialog
    v-model="attribute.isShown"
    :persistent="attribute.isPersistent"
    width="auto"
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ attribute.content.title }}
      </v-card-title>
      <v-card-text>{{ attribute.content.detail }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="(item, index) in attribute.actions"
          :color="item.color ?? 'green-darken-1'"
          variant="text"
          :key="index"
          @click="item.onClick"
        >
          {{ item.title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { DialogBoxAttribute } from "./composable/useDialogBox";

export default defineComponent({
  name: "DialogBox",
  props: {
    attribute: {
      type: Object as PropType<DialogBoxAttribute>,
      required: true,
    },
  },
});
</script>
