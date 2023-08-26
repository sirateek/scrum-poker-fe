<template>
  <div class="relative aspect-[1/1.5] max-w-[130px] max-h-[200px]">
    <VCard color="#5C8984" class="rounded-xl h-full w-full z-10">
      <div class="flex items-center justify-center h-full w-full p-3">
        <p class="text-3xl truncate">
          {{ value }}
        </p>
      </div>
    </VCard>
    <div class="pt-7">
      <slot name="below"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PokerCard",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup() {
    const attributes = reactive({
      maxWidth: "130px",
      maxHeight: "182px",
    });
  },
});
</script>
