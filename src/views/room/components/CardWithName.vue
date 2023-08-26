<template>
  <Card :value="value">
    <template v-slot:below>
      <div class="absolute z-0 w-full bottom-0">
        <VCard class="rounded-2xl" color="#BE8C63">
          <div class="pt-15"></div>
          <p class="truncate mx-3">{{ name }}</p>
        </VCard>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "CardWithName",
  components: {
    Card,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
