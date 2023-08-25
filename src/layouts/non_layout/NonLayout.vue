<template>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Layout } from "../layout";

export default defineComponent({
  name: Layout.NonLayout,
});
</script>
