<template>
  <div class="mx-8">
    <div class="grid grid-cols-8 gap-4">
      <CardWithName
        v-for="i in 10"
        :key="i"
        value="3"
        name="TonnamTest"
      ></CardWithName>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardWithName from "./components/CardWithName.vue";

export default defineComponent({
  name: "RoomView",
  components: {
    CardWithName,
  },
});
</script>
