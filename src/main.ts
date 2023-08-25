import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as nativeComponent from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import "@/styles/style.css";
import { Layout } from "@/layouts/layout";
import NonLayout from "./layouts/non_layout/NonLayout.vue";
import MainLayoutVue from "./layouts/main_layout/MainLayout.vue";

const vuetify = createVuetify({
  components: {
    ...nativeComponent,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App);

// Create Vue Application
app
  .use(router)
  .use(vuetify)
  .component(Layout.NonLayout, NonLayout)
  .component(Layout.MainLayout, MainLayoutVue)
  .mount("#app");
