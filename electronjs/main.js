// pmim-ibus electronjs
const path = require("node:path");
const { readFile } = require("node:fs/promises");
const { app, BrowserWindow, ipcMain } = require("electron");

const flatpak = require("./flatpak.js");

// FIXME
app.commandLine.appendSwitch("disable-accelerated-video-decode");

const LOGP = "pmim-ibus electronjs";

function logi(t) {
  console.log(LOGP + t);
}

// DEBUG
logi(": main.js");

const 开发地址 = "http://localhost:5173"; // vue `npm run dev`
const flatpak默认地址 = "http://127.0.0.1:20200";

function 获取加载地址(is_flatpak) {
  const 端口 = process.env["PMIMS_PORT"];
  if (端口 != null) {
    return `http://127.0.0.1:${端口}`;
  }
  if (is_flatpak) {
    return flatpak默认地址;
  }
  return 开发地址;
}

// 保存创建的窗口
const 窗口 = {
  // 主窗口
  主: null,
  // im0: 常驻工具条
  im0: null,
  // im1: 候选框
  im1: null,
};

function 初始化接口() {
  // 获取 electronjs 版本信息
  async function electron_version() {
    return process.versions;
  }

  // 读取 deno/fresh server http token
  async function read_token() {
    const xrd = process.env["XDG_RUNTIME_DIR"];
    const 口令文件 = path.join(xrd, "pmim/server_token");
    logi(" read token: " + 口令文件);

    return await readFile(口令文件, { encoding: "utf8" });
  }

  async function 窗口显示0() {
    if (null != 窗口.im0) {
      窗口.im0.showInactive();
    }
  }

  async function 窗口隐藏0() {
    if (null != 窗口.im0) {
      窗口.im0.hide();
    }
  }

  async function 窗口显示() {
    if (null != 窗口.im1) {
      窗口.im1.showInactive();
    }
  }

  async function 窗口隐藏() {
    if (null != 窗口.im1) {
      窗口.im1.hide();
    }
  }

  async function 窗口长宽(_, w, h) {
    if (null != 窗口.im1) {
      窗口.im1.setSize(w, h);
    }
  }

  async function 窗口位置(_, x, y) {
    if (null != 窗口.im1) {
      窗口.im1.setPosition(x, y);
    }
  }

  ipcMain.handle("ea:electron_version", electron_version);
  ipcMain.handle("ea:read_token", read_token);

  ipcMain.handle("ea:窗口显示0", 窗口显示0);
  ipcMain.handle("ea:窗口隐藏0", 窗口隐藏0);
  ipcMain.handle("ea:窗口显示", 窗口显示);
  ipcMain.handle("ea:窗口隐藏", 窗口隐藏);
  ipcMain.handle("ea:窗口长宽", 窗口长宽);
  ipcMain.handle("ea:窗口位置", 窗口位置);
}

function 创建窗口(is_flatpak) {
  const preload = path.join(__dirname, "preload.js");

  // 主窗口
  窗口.主 = new BrowserWindow({
    width: 400,
    height: 700,

    backgroundColor: "#FFF3E0",
    autoHideMenuBar: true,
    show: false,

    webPreferences: {
      preload,
    },
  });

  // im0: 常驻工具条
  窗口.im0 = new BrowserWindow({
    width: 400,
    height: 100,
    x: 100,
    y: 100,

    //backgroundColor: "#FFF3E0",
    autoHideMenuBar: true,
    // 不可调整大小
    resizable: false,
    // 置顶窗口
    alwaysOnTop: true,
    // 无边框
    frame: false,
    // 透明窗口
    transparent: true,
    // 默认隐藏窗口
    //show: false,

    webPreferences: {
      preload,

      // 默认页面缩放
      zoomFactor: 1.4,
    },
  });

  // im1: 候选框
  窗口.im1 = new BrowserWindow({
    width: 1000,
    height: 200,
    x: 100,
    y: 300,

    //backgroundColor: "#FFF3E0",
    autoHideMenuBar: true,
    // 不可调整大小
    resizable: false,
    // 置顶窗口
    alwaysOnTop: true,
    // 无边框
    frame: false,
    // 透明窗口
    transparent: true,
    // 默认隐藏窗口
    show: false,
    // 不可获得焦点
    focusable: false,

    webPreferences: {
      preload,

      // 默认页面缩放
      zoomFactor: 1.4,
    },
  });
  // DEBUG
  if (1 == process.env["PMIM_DEBUG"]) {
    窗口.im1.webContents.openDevTools();
  }

  const url = 获取加载地址(is_flatpak);

  const u1 = url + "/index.html";
  logi(" URL: " + u1);
  窗口.主.loadURL(u1);

  const u2 = url + "/im0/index.html";
  logi(" URL: " + u2);
  窗口.im0.loadURL(u2);

  const u3 = url + "/im1/index.html";
  logi(" URL: " + u3);
  窗口.im1.loadURL(u3);
}

// 同时只运行一个实例
const 数据 = {
  // TODO
};

const 单例 = app.requestSingleInstanceLock(数据);

if (!单例) {
  logi(": second instance, exit");
  app.quit();
} else {
  app.on("second-instance", (事件, 命令行, 工作目录, 数据) => {
    logi(": second-instance");
    // TODO
    console.log(事件);
    console.log(命令行);
    console.log(工作目录);
    console.log(数据);
  });

  app.whenReady().then(async () => {
    初始化接口();

    // flatpak 初始化
    const is_flatpak = await flatpak.is_flatpak();
    if (is_flatpak) {
      await flatpak.初始化(获取加载地址);
    }

    创建窗口(is_flatpak);
  });

  // TODO
  app.on("window-all-closed", () => {
    app.quit();
  });
}
