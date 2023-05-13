import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "@mdi/font/css/materialdesignicons.css";
import "bootstrap/dist/css/bootstrap.css";

loadFonts();

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify, {
    icons: {
      iconfont: "mdi",
    },
  })
  .mount("#app");
