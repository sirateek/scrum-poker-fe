<template>
  <div>
    <div class="items-start text-left mt-3">
      <VBtn class="normal-case">Flip My Card</VBtn>
      <VBtn>Test</VBtn>
      <VBtn>Test</VBtn>
    </div>

    <!-- Card Selection -->
    <div
      class="grid grid-rows-1 grid-flow-col gap-4 w-full h-full overflow-x-scroll pt-4"
    >
      <div
        class="w-20 hover:-translate-y-4 duration-150"
        v-for="i in 20"
        :key="i"
      >
        <Card value="10" text-size="text-lg"></Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "HandAction",
  components: {
    Card,
  },
});
</script>
