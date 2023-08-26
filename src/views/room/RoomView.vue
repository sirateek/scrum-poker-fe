<template>
  <div class="mx-8">
    <!-- Display -->
    <div class="flex flex-row max-h-[65vh]">
      <div class="grid grid-cols-5 w-full gap-4 overflow-y-scroll">
        <CardWithName
          v-for="i in 20"
          :key="i"
          value="3"
          name="TonnamTest"
        ></CardWithName>
      </div>
      <div v-if="true" class="text-center gap-5 flex flex-col w-[15vw]">
        <VCard class="p-3 rounded-md">
          <h2>Score Board</h2>
          <div class="flex flex-col gap-2 mt-3 max-h-[65vh] overflow-y-scroll">
            <div v-for="i in 20" :key="i">
              <div class="flex flex-row">
                <Card value="2" text-size="text-md"></Card>
                <p class="ml-1 flex items-center justify-center">x 5</p>
              </div>
              <VDivider class="mt-2"></VDivider>
            </div>
            <div class="flex flex-row">
              <Card value="?" text-size="text-md"></Card>
              <p class="ml-1 flex items-center justify-center">x 5</p>
            </div>
            <VDivider class="mt-2"></VDivider>
          </div>
        </VCard>
      </div>

      <div class="text-center gap-5 flex flex-col w-[18vw] ml-3">
        <VCard class="p-3 rounded-md">
          <h2>Player</h2>
          <div
            class="flex flex-col items-start max-h-[65vh] gap-2 mt-3 overflow-y-scroll"
          >
            <div>
              <VIcon icon="mdi-eye"></VIcon>
              Spectator x 5
            </div>
            <div v-for="i in 30" :key="i">
              <VIcon icon="mdi-account"></VIcon>
              Tonnam
            </div>
          </div>
        </VCard>
      </div>
    </div>

    <!-- Hand -->
    <div class="h-[25vh] w-full flex flex-col">
      <!-- Card Selection -->

      <div class="items-start text-left">Test</div>

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
  </div>
</template>
≈
<script lang="ts">
import { defineComponent } from "vue";
import CardWithName from "./components/CardWithName.vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "RoomView",
  components: {
    Card,
    CardWithName,
  },
});
</script>
