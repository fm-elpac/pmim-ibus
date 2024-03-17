// pmim 插件系统
import { pm_conf_get, pm_conf_set, pm_pl } from "@/api/da/mod.js";

// 配置项: 用户启用插件的列表 `[""]`
const CONF_PLUGIN_EL = "plugin.el";

// 加载所有插件的列表
export async function 加载插件列表() {
  return await pm_pl();
}

// 加载启用的插件列表
export async function 加载启用插件列表() {
  let 启用列表 = [];
  const c = await pm_conf_get([CONF_PLUGIN_EL]);
  if (null != c[CONF_PLUGIN_EL]) {
    启用列表 = c[CONF_PLUGIN_EL];
  }

  const o = [];
  for (const i of await 加载插件列表()) {
    // 内置插件, 默认启用 = 1
    if ((1 == i.内置) && (1 == i.描述.默认启用)) {
      // 内置默认启用插件
      o.push(i);
    } else if (启用列表.includes(i.id)) {
      // 用户启用插件
      o.push(i);
    }
  }
  return o;
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
