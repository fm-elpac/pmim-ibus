import { createRouter, createWebHashHistory } from "vue-router";
import 安装指导 from "../v/安装指导/p.vue";
import 输入设置 from "../v/输入设置/p.vue";
import 个性化 from "../v/个性化/p.vue";
import 输入测量 from "../v/输入测量/p.vue";
import 数据库 from "../v/数据库/p.vue";
import 插件 from "../v/插件/p.vue";
import 关于 from "../v/关于/p.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: 安装指导,
      name: "安装指导",
    },
    {
      path: "/input_config",
      component: 输入设置,
      name: "输入设置",
    },
    {
      path: "/style",
      component: 个性化,
      name: "个性化",
    },
    {
      path: "/input_m",
      component: 输入测量,
      name: "输入测量",
    },
    {
      path: "/db",
      component: 数据库,
      name: "数据库",
    },
    {
      path: "/plugin",
      component: 插件,
      name: "插件",
    },
    {
      path: "/about",
      component: 关于,
      name: "关于",
    },
  ],
});

export default router;
