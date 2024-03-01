// electronjs api

// preload.js
const ea = window.pmim_ea;

// 检查是否在 electronjs 环境中运行
export function ea可用() {
  return null != window.pmim_ea;
}

// 获取 electronjs 版本信息
export async function electron版本() {
  return await ea.electron_version();
}

// 读取 deno/fresh server http token
export async function 读口令() {
  return await ea.read_token();
}

export async function 窗口显示0() {
  return await ea.窗口显示0();
}

export async function 窗口隐藏0() {
  return await ea.窗口隐藏0();
}

export async function 窗口显示() {
  return await ea.窗口显示();
}

export async function 窗口隐藏() {
  return await ea.窗口隐藏();
}

export async function 窗口长宽(w, h) {
  return await ea.窗口长宽(w, h);
}

export async function 窗口位置(x, y) {
  return await ea.窗口位置(x, y);
}
