// pmim-ibus/electronjs/flatpak.js
const path = require("node:path");
const { stat, unlink, cp, mkdir } = require("node:fs/promises");
const { spawn } = require("node:child_process");

const LOGP = "pmim-ibus electronjs flatpak";

function logi(t) {
  console.log(LOGP + t);
}

async function 文件存在(路径) {
  try {
    await stat(路径);
    // 文件存在
    return true;
  } catch (e) {
    // 文件不存在
    // 忽略错误
  }
  return false;
}

async function is_flatpak() {
  // flatpak 运行环境 标志文件
  const F = "/.flatpak-info";
  const 结果 = await 文件存在(F);
  if (结果) {
    logi(": in flatpak");
  }
  return 结果;
}

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

async function 初始化(获取加载地址) {
  logi(": flatpak 初始化");

  // 不启动 pmim-server
  if (1 == process.env["PMIM_NS"]) {
    logi(": 不启动 pmim-server");
    return;
  }

  // 删除 XDG_RUNTIME_DIR/pmim/us
  const US = process.env["XDG_RUNTIME_DIR"] + "/pmim/us";
  logi(": rm " + US);
  try {
    await unlink(US);
  } catch (e) {
    console.log(e);
  }

  // 检查内置数据库
  const 数据库路径 = path.join(
    process.env["XDG_CONFIG_HOME"],
    "pmim/pmim_sys.db",
  );
  if (!await 文件存在(数据库路径)) {
    logi(": 文件不存在 " + 数据库路径);
    // 复制内置数据库
    await mkdir(path.dirname(数据库路径), { recursive: true });
    await cp("/app/pmim_sys-0.db", 数据库路径);
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
