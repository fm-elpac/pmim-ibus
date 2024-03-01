// pmim-ibus/electronjs/flatpak.js
const { stat, unlink } = require("node:fs/promises");
const { spawn } = require("node:child_process");

const LOGP = "pmim-ibus electronjs flatpak";

function logi(t) {
  console.log(LOGP + t);
}

async function is_flatpak() {
  // flatpak 运行环境 标志文件
  const F = "/.flatpak-info";
  try {
    await stat(F);

    logi(": in flatpak");
    return true;
  } catch (e) {
    // 忽略错误
  }
  return false;
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function 初始化(获取加载地址) {
  logi(": flatpak 初始化");

  // 删除 XDG_RUNTIME_DIR/pmim/us
  const US = process.env["XDG_RUNTIME_DIR"] + "/pmim/us";
  logi(": rm " + US);
  try {
    await unlink(US);
  } catch (e) {
    console.log(e);
  }

  // 启动 deno
  spawn("/app/bin/deno", [
    "run",
    "-A",
    "--unstable-kv",
    "/app/server/main.ts",
  ], {
    stdio: "inherit",
  });

  // 等待初始化完毕
  const URL = 获取加载地址(true) + "/version";

  while (true) {
    logi(": " + URL);
    try {
      const r = await fetch(URL);
      if (r.ok) {
        // 初始化完毕
        logi(": server 已启动");
        return;
      }
    } catch (e) {
      //console.log(e);
    }

    await sleep(1e3);
  }
}

module.exports = {
  is_flatpak,
  初始化,
};
