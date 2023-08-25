<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Layout } from "@/layouts/layout";

export default defineComponent({
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout || Layout.MainLayout;
    },
  },
});
</script>

<style lang="scss">
@font-face {
  font-family: "LINESeed";
  src: local("LINESeed"),
    url(@/assets/fonts/LineSeed/LINESeedSansTH_W_Bd.woff) format("woff"),
    url(@/assets/fonts/LineSeed/LINESeedSansTH_W_He.woff) format("woff"),
    url(@/assets/fonts/LineSeed/LINESeedSansTH_W_Rg.woff) format("woff"),
    url(@/assets/fonts/LineSeed/LINESeedSansTH_W_Th.woff) format("woff"),
    url(@/assets/fonts/LineSeed/LINESeedSansTH_W_XBd.woff) format("woff");
}

#app {
  font-family: LINESeed;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body,
html {
  height: 100%;
  overflow-y: hidden;
}
</style>
