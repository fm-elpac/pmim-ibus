// 修复在 Web Components (vue customElement) 中使用 vuetify 的 BUG
// (方法 2)
import { createApp, defineCustomElement as dce, getCurrentInstance } from "vue";

import vuetify from "../plugin/vuetify.js";

// setup()
export function fixVuetify() {
  // 插件列表
  const plugins = [
    vuetify,
  ];

  // 创建假的 app 示例, 并安装插件
  const app = createApp();
  // 不要把 vuetify theme 直接放到 <head> 中
  // 摸拟 unhead 接口
  app._context.provides.usehead = {
    push(head) {
      // TODO
      console.log("usehead.push()");
      console.log(head);

      return {
        patch(head) {
          // TODO
          console.log("usehead: entry.patch()");
          console.log(head);
        },
      };
    },
  };

  // 安装插件
  plugins.forEach(app.use);

  // 复制插件
  const i = getCurrentInstance();
  Object.assign(i.appContext, app._context);
  Object.assign(i.provides, app._context.provides);
}
