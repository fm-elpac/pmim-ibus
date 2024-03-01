// deno/fresh api
import { ea可用, 读口令 } from "../ea/mod.js";
import { aa_口令, aa可用 } from "../aa/mod.js";

// 接口基地址
const B = "/pmims_api/";

// 访问接口所需的认证口令
const etc = {
  口令: null,
};

export async function 更新口令() {
  if (ea可用()) {
    etc.口令 = await 读口令();
  } else if (aa可用()) {
    etc.口令 = aa_口令();
  }
}

export async function 获取口令() {
  if (null == etc.口令) {
    await 更新口令();
  }
  return etc.口令;
}

// 请求 da 接口 (对 `fetch` 封装)
export async function da(method, 路径, 数据) {
  const URL = B + 路径;

  const 选项 = {
    method,
    headers: {
      "x-token": await 获取口令(),
    },
  };
  // 发送 JSON 数据
  if (数据 != null) {
    选项.headers["Content-Type"] = "application/json";
    选项.body = JSON.stringify(数据);
  }

  const 响应 = await fetch(URL, 选项);
  // 错误检查 (HTTP code)
  if (!响应.ok) {
    throw new Error("HTTP " + 响应.status);
  }

  function 是json(响应) {
    const 类型 = 响应.headers.get("content-type");
    if ((类型 != null) && (类型.startsWith("application/json"))) {
      return true;
    }
    return false;
  }

  // 检查返回类型
  if (是json(响应)) {
    const 结果 = await 响应.json();
    // 错误检查 (`结果.e` 错误代码, `结果.t` 错误描述)
    if ((结果.e != null) && (结果.e != 0)) {
      throw new Error(`e ${结果.e}: ${结果.t}`);
    }
    // 没有错误
    return 结果;
  } else {
    // 文本类型的数据
    return await 响应.text();
  }
}

// GET da 接口
export async function da_get(路径, 数据) {
  return await da("GET", 路径, 数据);
}

// POST da 接口
export async function da_post(路径, 数据) {
  return await da("POST", 路径, 数据);
}

// DEBUG
window.da = da;
window.da_get = da_get;
window.da_post = da_post;

// DEBUG
window._set_token = (t) => {
  etc.口令 = t;
};
