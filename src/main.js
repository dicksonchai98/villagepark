// import "./assets/main.css";
import "./assets/styles.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import router from "./router";
import "sweetalert2/dist/sweetalert2.min.css";
import VueScrollTo from "vue-scrollto";

const app = createApp(App);

app.use(LoadingPlugin, {
  // 可以在後面加上客製化樣式
  color: "#FF0000",
});

app.use(router);

app.use(createPinia());

app.mount("#app");

app.use(VueScrollTo);
