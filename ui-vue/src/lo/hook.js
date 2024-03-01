import { onMounted } from "vue";
import { aa_log, aa_加载, aa_口令, aa_端口, aa可用 } from "../api/aa/mod.js";

function logi(t) {
  console.log(t);

  if (aa可用()) {
    aa_log("" + t);
  }
}

async function f(url, token) {
  return await fetch(url, {
    method: "GET",
    headers: {
      "x-token": token,
    },
    mode: "no-cors",
  });
}

async function 检查() {
  logi("检查");

  if (!aa可用()) {
    // 测试
    await f("http://127.0.0.1:20200/pmims_api/version", "666");
  }

  // 尝试获取端口
  const p1 = aa_端口();
  logi(p1);
  const p = Number.parseInt(p1);
  if (Number.isNaN(p)) {
    return;
  }

  // 检查地址
  //const 检查URL = `http://127.0.0.1:${p}/pmims_api/version`;
  const 检查URL = `http://127.0.0.1:${p}/version`;
  logi(检查URL);

  await f(检查URL, aa_口令());
  // 非跨域请求无法看到结果, 所以此处不再检查结果

  // 服务器已成功启动
  // 加载页面
  const 加载URL = `http://127.0.0.1:${p}/im2/index.html`;
  logi(加载URL);
  window.location = 加载URL;

  aa_加载(加载URL);
}

async function 检查1() {
  try {
    await 检查();
  } catch (e) {
    logi(e);
  }
}

export function use加载() {
  onMounted(() => {
    logi("开始加载");

    setInterval(检查1, 1e3);
  });
}
