<template>
  <div class="relative aspect-[1/1.5] max-w-[130px] max-h-[200px]">
    <VCard :color="color" class="rounded-lg h-full w-full z-10">
      <div class="flex items-center justify-center h-full w-full p-3">
        <p :class="textClasses">
          {{ value }}
        </p>
      </div>
    </VCard>
    <div v-if="hasSlot('footerAbsolute')" class="pt-7">
      <slot name="footerAbsolute"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { useSlots } from "vue";
import { computed } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PokerCard",
  props: {
    value: {
      type: String,
      required: true,
    },
    textSize: {
      type: String,
      default: "text-3xl",
    },
    color: {
      type: String,
      default: "#5C8984",
    },
  },
  setup(props) {
    const textClasses = computed(() => {
      return `${props.textSize} truncate`;
    });

    const slots = useSlots();
    const hasSlot = (name: string | number) => {
      return !!slots[name];
    };

    return {
      textClasses,
      hasSlot,
    };
  },
});
</script>
