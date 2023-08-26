<template>
  <div class="text-center gap-5 flex flex-col w-[15vw]">
    <VCard class="p-3 rounded-md">
      <h2>{{ title }}</h2>
      <div class="flex flex-col gap-2 mt-3 max-h-[60vh] overflow-y-scroll">
        <slot></slot>
      </div>
    </VCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InformationBoard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
