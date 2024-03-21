import { onMounted, ref } from "vue";
import { 加载插件列表_启用 } from "../插件/mod.js";
import { onLoad, 加载2, 加载js, 加载皮肤配置 } from "./util.js";

export function 使用皮肤(能力) {
  const 已加载 = ref(false);
  // 比如: pmim-uis-nc-im0
  const 组件名称 = ref("");

  // 默认皮肤: pmim-uis-nc
  const 皮肤名称 = ref("pmim-uis-nc");
  const 皮肤信息 = ref({});

  onMounted(async () => {
    const 插件列表 = await 加载插件列表_启用();
    const 皮肤 = await 加载皮肤配置();
    // 检查用户设置的皮肤
    if (null != 皮肤) {
      const 插件 = 插件列表.find((i) => 皮肤 == i.id);
      if (null != 插件) {
        // 检查插件启用
        if (1 == 插件.启用) {
          // 检查插件能力
          if (null != 插件.描述.皮肤) {
            if (null != 插件.描述.皮肤.能力) {
              if (插件.描述.皮肤.能力.includes(能力)) {
                // 插件检查通过
                皮肤名称.value = 皮肤;
              }
              // else: 皮肤没有对应的能力
            }
            // else: 皮肤描述文件错误
          }
          // else: 插件不是皮肤
        }
        // else: 插件没有启用, 忽略
      }
      // else: 插件不存在, 忽略
    }
    // else: 用户没有设置皮肤

    // 皮肤信息
    皮肤信息.value = 插件列表.find((i) => 皮肤名称.value == i.id);

    // DEBUG
    console.log("加载皮肤: " + 能力);
    console.log(皮肤名称.value);
    console.log(皮肤信息.value);

    await 加载js(皮肤信息.value);
    // 加载完毕
    组件名称.value = 皮肤信息.value.描述.皮肤.名称 + "-" + 能力;
    已加载.value = true;
    // DEBUG
    console.log("皮肤加载完毕 " + 组件名称.value);
  });

  // 组件初始化
  async function 加载(element) {
    await 加载2(皮肤信息.value, element);
  }

  return {
    已加载,
    组件名称,

    皮肤名称,
    皮肤信息,

    加载,
  };
}
