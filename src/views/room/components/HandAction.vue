<template>
  <div>
    <div class="items-start text-left mt-3 flex flex-wrap gap-3">
      <VBtn variant="tonal" class="normal-case" prepend-icon="mdi-cards-variant"
        >Pull my card out from table</VBtn
      >
      <VBtn variant="tonal" class="normal-case" prepend-icon="mdi-eye-off"
        >Hide my Card</VBtn
      >
      <VBtn variant="tonal" class="normal-case" prepend-icon="mdi-cards"
        >Flip All Cards on the Table</VBtn
      >
      <VBtn variant="tonal" class="normal-case" prepend-icon="mdi-reload"
        >Clear Table</VBtn
      >
      <VBtn variant="tonal" class="normal-case" prepend-icon="mdi-door"
        >Switch to be Spectator</VBtn
      >
    </div>

    <!-- Card Selection -->
    <div
      class="grid grid-rows-1 grid-flow-col gap-4 w-full h-full overflow-x-scroll pt-4 mt-4"
    >
      <div
        :class="cardClass(i)"
        v-for="i in 11"
        :key="i"
        @click="updatePickedIndex(i)"
      >
        <Card :color="cardColor(i)" value="10" text-size="text-lg"></Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";
import { reactive } from "vue";

export default defineComponent({
  name: "HandAction",
  components: {
    Card,
  },
  setup() {
    const attributes = reactive({
      pickedIndex: -1,
    });

    const updatePickedIndex = (pickedIndex: number) => {
      attributes.pickedIndex = pickedIndex;
    };

    const cardClass = (pickedIndex: number) => {
      if (pickedIndex !== attributes.pickedIndex) {
        return "w-20 hover:-translate-y-4 duration-150 cursor-pointer";
      }

      return "w-20 -translate-y-4 duration-150 cursor-pointer";
    };

    const cardColor = (pickedIndex: number) => {
      if (pickedIndex !== attributes.pickedIndex) {
        return "#2C3333";
      }

      return "white";
    };

    return {
      cardClass,
      cardColor,
      updatePickedIndex,
    };
  },
});
</script>
