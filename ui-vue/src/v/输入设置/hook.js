import { computed, onMounted, ref } from "vue";
import { pm_ci, pm_conf_get, pm_conf_set, 发送页面刷新 } from "@/api/da/mod.js";
import { 加载双拼方案, 加载键盘布局 } from "@/插件/mod.js";

export function use输入设置() {
  const 双拼方案列表 = ref([
    {
      id: "",
      名称: "(无)",
      双拼表: {},
      双拼键位: {
        声母: {},
        韵母: {},
      },
    },
  ]);
  const 键盘布局列表 = ref([]);

  async function 加载插件() {
    const 双拼 = await 加载双拼方案();
    双拼方案列表.value = 双拼.concat(双拼方案列表.value);

    键盘布局列表.value = await 加载键盘布局();
  }

  const 配置 = ref({
    "ui.2p_id": null,
    "ui.2pb.user": null,
    "ui.kbl_id": null,
    "ui.kbl.user": null,
  });

  const 双拼方案id = ref("2p_zirjma");
  const 键盘布局id = ref("qwerty");

  const 自定义双拼表 = ref("");

  async function 加载配置() {
    const r = await pm_conf_get([
      "ui.2p_id",
      "ui.2pb.user",
      "ui.kbl_id",
      "ui.kbl.user",
    ]);

    配置.value = Object.assign({}, 配置.value, r);
    // 更新显示配置
    const p2_id = 配置.value["ui.2p_id"];
    if (null != p2_id) {
      双拼方案id.value = p2_id;
    }
    const pb_user = 配置.value["ui.2pb.user"];
    if (null != pb_user) {
      自定义双拼表.value = JSON.stringify(pb_user, "", "  ");
    } else {
      const 示例 = 双拼方案列表.value.find((x) => x.id == "2p_zirjma").双拼表;
      自定义双拼表.value = JSON.stringify(示例, "", "  ");
    }
    const kbl_id = 配置.value["ui.kbl_id"];
    if (null != kbl_id) {
      键盘布局id.value = kbl_id;
    }
  }

  const 正在保存 = ref(false);
  const 保存成功 = ref(false);
  // "": 错误信息
  const 保存失败 = ref(null);

  async function 保存配置() {
    正在保存.value = true;
    保存成功.value = false;
    保存失败.value = null;

    try {
      // 保存 ui 配置
      const c1 = 配置.value;
      c1["ui.2p_id"] = 双拼方案id.value;
      // 用户自定义双拼方案
      if ("2p_user" == 双拼方案id.value) {
        // 检查双拼表
        const 原始 = 自定义双拼表.value;
        let 数据 = {};
        try {
          数据 = JSON.parse(原始);
        } catch (e) {
          const 错误信息 = "JSON 格式错误: " + e;
          throw 错误信息;
        }

        c1["ui.2pb.user"] = 数据;
      }
      c1["ui.kbl_id"] = 键盘布局id.value;
      // TODO ui.kbl.user

      await pm_conf_set(c1);

      // 保存核心配置
      const c2 = {
        "c.2pb": "2p_zirjma",
        "c.2pb.user": {},
      };
      if ("2p_zirjma" != 双拼方案id.value) {
        c2["c.2pb"] = "2p_user";

        if ("2p_user" != 双拼方案id.value) {
          // 内置方案
          const 双拼表 = 双拼方案列表.value.find((x) =>
            x.id == 双拼方案id.value
          ).双拼表;
          c2["c.2pb.user"] = 双拼表;
        } else {
          // 用户自定义双拼方案
          c2["c.2pb.user"] = c1["ui.2pb.user"];
        }
      }
      await pm_conf_set(c2);

      // 重启核心
      await pm_ci();

      // 重新加载配置
      await 加载配置();

      await 发送页面刷新();

      保存成功.value = true;
    } catch (e) {
      console.log(e);

      保存失败.value = "" + e;
    }

    正在保存.value = false;
  }

  onMounted(async () => {
    await 加载插件();
    await 加载配置();
  });

  const 显示双拼列表 = computed(() => {
    return [].concat(双拼方案列表.value.map((i) => ({
      title: i.名称,
      value: i.id,
    }))).concat([
      {
        title: "自定义",
        value: "2p_user",
      },
    ]);
  });

  const 显示键盘布局列表 = computed(() => {
    return 键盘布局列表.value.map((i) => ({
      title: i.名称,
      value: i.id,
    }));
  });

  const 显示键盘布局 = computed(() => {
    const 布局 = 键盘布局列表.value.find((x) => x.id == 键盘布局id.value);
    if (null != 布局) {
      return 布局.PC;
    } else {
      return {
        偏移: [0, 0, 0],
        键位: [[], [], []],
      };
    }
  });

  const 显示双拼键位 = computed(() => {
    const 方案 = 双拼方案列表.value.find((x) => x.id == 双拼方案id.value);
    if (null != 方案) {
      return 方案.双拼键位;
    } else {
      return {
        声母: {},
        韵母: {},
      };
    }
  });

  return {
    双拼方案id,
    键盘布局id,
    自定义双拼表,

    显示双拼列表,
    显示键盘布局,
    显示双拼键位,
    显示键盘布局列表,

    正在保存,
    保存成功,
    保存失败,

    保存配置,
  };
}
