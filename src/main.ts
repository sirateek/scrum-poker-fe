import { createApp, h, provide } from "vue";
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
import { ConfigProvider } from "./utils/ConfigProvider";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

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

// Create Apollo Clients
const httpLink = createHttpLink({
  uri: ConfigProvider.instance.config.VITE_POKER_API_HOST + "/query",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const pokerServiceClient = new ApolloClient({
  link: httpLink,
  cache,
});

const vueApp = createApp({
  setup() {
    provide(DefaultApolloClient, pokerServiceClient);
  },
  render: () => h(App),
});

// Create Vue Application
vueApp
  .use(router)
  .use(vuetify)
  .component(Layout.NonLayout, NonLayout)
  .component(Layout.MainLayout, MainLayoutVue);

// Mount
vueApp.mount("#app");
