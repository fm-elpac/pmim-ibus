import { createRouter, createWebHashHistory } from "vue-router";
import 首页 from "../v/首页.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: 首页,
    },
  ],
});

export default router;
