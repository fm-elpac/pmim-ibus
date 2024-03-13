import { da_get, da_post, 获取口令 } from "./util.js";

// 获取后端版本号
export async function pm_version() {
  return await da_get("version");
}

// ServerSentEvent: /pmims_api/ibus_sse
// 获取从 ibus 发来的消息
export async function ibus_sse() {
  // 设置 cookie, 用于 SSE 认证
  document.cookie = "x_token=" + await 获取口令() + ";path=/pmims_api";

  return new EventSource("/pmims_api/ibus_sse", {
    withCredentials: true,
  });
}

// 输入反馈
export async function pm_f(f) {
  return await da_post("f", f);
}

// 提交文本
export async function pm_commit(d) {
  return await da_post("commit", d);
}

// 拼音切分
export async function pm_pin_yin(t) {
  return await da_post("pin_yin", {
    t,
  });
}

// 拼音转汉字
export async function pm_p2c(p) {
  return await da_post("p2c", {
    pin_yin: [p],
    n: 0,
  });
}

// 列表显示: ASCII 符号, 扩展
export async function pm_li(c, o_id) {
  return await da_post("li", {
    c,
    o_id,
  });
}

// 获取数据库信息 (ds, du)
export async function pm_db() {
  return await da_post("db", 0);
}

// 输入测量 (统计结果)
export async function pm_m(d, s) {
  return await da_post("m", {
    d,
    s,
  });
}

// 读取配置项
export async function pm_conf_get(d) {
  return await da_post("conf_get", d);
}

// 保存配置项
export async function pm_conf_set(d) {
  return await da_post("conf_set", d);
}

// DEBUG
window.pm_version = pm_version;
window.pm_f = pm_f;
window.pm_commit = pm_commit;
window.pm_pin_yin = pm_pin_yin;
window.pm_p2c = pm_p2c;
window.pm_li = pm_li;
window.pm_db = pm_db;
window.pm_m = pm_m;
window.pm_conf_get = pm_conf_get;
window.pm_conf_set = pm_conf_set;
