// pmim 插件系统
import { pm_conf_get, pm_conf_set, pm_pl } from "@/api/da/mod.js";

// 配置项: 用户启用插件的列表 `[""]`
const CONF_PLUGIN_EL = "plugin.el";
// 配置项: 用户禁用的插件的列表 `[""]`
const CONF_PLUGIN_DL = "plugin.dl";
// 配置项: 用户设置的双拼方案
const CONF_2P_ID = "ui.2p_id";
// 配置项: 用户设置的键盘布局
const CONF_KBL_ID = "ui.kbl_id";
// 配置项: 用户自定义的键盘布局
const CONF_KBL_USER = "ui.kbl.user";

// 加载所有插件的列表
export async function 加载插件列表() {
  return await pm_pl();
}

// 重置插件的启用状态
export async function 重置插件启用状态() {
  await pm_conf_set({
    [CONF_PLUGIN_EL]: [],
    [CONF_PLUGIN_DL]: [],
  });
}

// 加载插件列表, 附带启用状态
export async function 加载插件列表_启用() {
  const o = await 加载插件列表();

  let 启用列表 = [];
  let 禁用列表 = [];
  const c = await pm_conf_get([CONF_PLUGIN_EL, CONF_PLUGIN_DL]);
  if (null != c[CONF_PLUGIN_EL]) {
    启用列表 = c[CONF_PLUGIN_EL];
  }
  if (null != c[CONF_PLUGIN_DL]) {
    禁用列表 = c[CONF_PLUGIN_DL];
  }

  for (const i of o) {
    // 默认启用状态: 内置插件, 默认启用 = 1
    const 默认启用 = (1 == i.内置) && (1 == i.描述.默认启用);
    let 启用 = 默认启用;
    // 用户启用插件
    if (启用列表.includes(i.id)) {
      启用 = true;
    }
    // 禁用插件: 优先级更高
    if (禁用列表.includes(i.id)) {
      启用 = false;
    }

    if (启用) {
      i.启用 = 1;
    } else {
      i.启用 = 0;
    }
  }
  return o;
}

// 加载启用的插件列表
export async function 加载启用插件列表() {
  const o = await 加载插件列表_启用();
  return o.filter((i) => 1 == i.启用);
}

export async function 加载插件json(插件id, 路径) {
  const URL = `/plugin/${插件id}/${路径}`;
  const r = await fetch(URL);
  return await r.json();
}

// 加载双拼方案列表
export async function 加载双拼方案() {
  const o = [];
  for (const i of await 加载启用插件列表()) {
    if (null != i.描述.双拼方案) {
      try {
        const 数据 = await 加载插件json(i.id, i.描述.双拼方案);
        o.push(数据);
      } catch (e) {
        // 忽略错误
        console.log(e);
      }
    }
  }
  return [].concat(...o);
}

// 加载键盘布局列表
export async function 加载键盘布局() {
  const o = [];
  for (const i of await 加载启用插件列表()) {
    if (null != i.描述.键盘布局) {
      try {
        const 数据 = await 加载插件json(i.id, i.描述.键盘布局);
        o.push(数据);
      } catch (e) {
        // 忽略错误
        console.log(e);
      }
    }
  }
  return [].concat(...o);
}

// 适用于手机软键盘
export async function 加载双拼方案和键盘布局() {
  const 键盘布局 = await 加载键盘布局();
  const 双拼方案 = await 加载双拼方案();

  // 加载配置项
  const c = await pm_conf_get([CONF_2P_ID, CONF_KBL_ID, CONF_KBL_USER]);

  // 默认键盘布局
  const 默认布局 = "abcd7109";
  let 布局 = {
    id: "",
    名称: "",
    PC: {
      偏移: [],
      键位: [[], [], []],
    },
    手机: [[], [], [], []],
  };
  if (("user" == c[CONF_KBL_ID]) && (null != c[CONF_KBL_USER])) {
    // 用户自定义键盘布局
    布局 = c[CONF_KBL_USER];
  } else if (
    null != c[CONF_KBL_ID] &&
    (null != 键盘布局.find((i) => c[CONF_KBL_ID] == i.id))
  ) {
    // 用户设置的键盘布局
    布局 = 键盘布局.find((i) => c[CONF_KBL_ID] == i.id);
  } else if (null != 键盘布局.find((i) => 默认布局 == i.id)) {
    // 默认键盘布局
    布局 = 键盘布局.find((i) => 默认布局 == i.id);
  } else if (键盘布局.length > 0) {
    // 使用第一个可用布局
    布局 = 键盘布局[0];
  }

  // 双拼方案
  let 双拼 = {
    id: "",
    名称: "",
    双拼表: {},
    双拼键位: {
      声母: {},
      韵母: {},
    },
  };
  if (
    (null != c[CONF_2P_ID]) &&
    (null != 双拼方案.find((i) => c[CONF_2P_ID] == i.id))
  ) {
    双拼 = 双拼方案.find((i) => c[CONF_2P_ID] == i.id);
  }

  return [布局, 双拼];
}
