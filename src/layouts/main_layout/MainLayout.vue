<template>
  <v-layout>
    <VAppBar>
      <VAppBarTitle class="text-left">Poker Perkoke</VAppBarTitle>
      <VSpacer></VSpacer>
      <v-menu
        location="bottom"
        content-class="rounded-xl"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="rounded-pill">
            <VIcon icon="mdi-account"></VIcon>
            <p
              class="ml-3 normal-case max-w-screen-sm text-ellipsis overflow-hidden"
            >
              Giggy
            </p>
          </v-btn>
        </template>
      </v-menu>
    </VAppBar>

    <v-main class="mt-2">
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>
