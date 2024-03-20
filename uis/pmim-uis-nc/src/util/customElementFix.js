// 修复在 Web Components (vue customElement) 中使用 vuetify 的 BUG
//
// 相关链接:
// + <https://github.com/vuetifyjs/vuetify/issues/5054>
// + <https://stackoverflow.com/questions/69808113/how-to-use-vue-router-and-vuex-inside-custom-element-from-root/69820280>
import {
  createApp,
  defineCustomElement as dce,
  getCurrentInstance,
  h,
} from "vue";

export const defineCustomElement = (component, { plugins = [] } = {}) =>
  dce({
    ...component,
    render: () => h(component),
    //setup(...args) {
    setup() {
      const app = createApp();

      plugins.forEach(app.use);

      const i = getCurrentInstance();
      Object.assign(i.appContext, app._context);
      Object.assign(i.provides, app._context.provides);

      //return component.setup(...args);
    },
  });
