import "./assets/body.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import vuetify from "./plugin/vuetify.js";

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount("#app");
