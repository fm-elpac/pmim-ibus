// vue 组件: 用于加载皮肤 (动态 custom element, Web Components)
import { h } from "vue";
import { 使用皮肤 } from "../皮肤/hook.js";

export default {
  props: {
    能力: String,
    on加载: Function,
  },
  setup(props, { attrs }) {
    const 皮肤 = 使用皮肤(props.能力);

    async function on加载(e) {
      await 皮肤.加载(e.srcElement);

      if (null != props.on加载) {
        await props.on加载(e);
      }
    }

    // 渲染函数 (render): 动态传递所有属性和事件
    return () =>
      皮肤.已加载.value
        ? h(皮肤.组件名称.value, {
          "data-ce": 皮肤.组件名称.value,
          key: 皮肤.组件名称.value,
          on加载,

          ...attrs,
        })
        : h("div", { class: "to-load" });
  },
};
