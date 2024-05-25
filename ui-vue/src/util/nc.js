// 灰度模式 (禁用彩色)
import { pm_conf_get, pm_conf_set } from "../api/da/mod.js";

const 配置项 = "ui.nc";

export async function 初始化灰度模式() {
  if (await 灰度模式_读取配置()) {
    await 启用灰度模式();
  } else {
    await 禁用灰度模式();
  }
}

export async function 灰度模式_读取配置() {
  const 结果 = await pm_conf_get([配置项]);
  if ("1" == 结果[配置项]) {
    return true;
  }
  return false;
}

export async function 灰度模式_写入配置(启用 = false) {
  const 值 = 启用 ? "1" : "0";
  await pm_conf_set({
    [配置项]: 值,
  });
}

export function 启用灰度模式() {
  document.body.style.filter = "grayscale(100%)";
}

export function 禁用灰度模式() {
  document.body.style.filter = null;
}
