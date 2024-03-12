// pmim-ibus electronjs preload.js
const { contextBridge, ipcRenderer } = require("electron");

// electronjs 接口桥接
contextBridge.exposeInMainWorld("pmim_ea", {
  electron_version: () => ipcRenderer.invoke("ea:electron_version"),
  read_token: () => ipcRenderer.invoke("ea:read_token"),

  窗口显示0: () => ipcRenderer.invoke("ea:窗口显示0"),
  窗口隐藏0: () => ipcRenderer.invoke("ea:窗口隐藏0"),
  窗口显示: () => ipcRenderer.invoke("ea:窗口显示"),
  窗口隐藏: () => ipcRenderer.invoke("ea:窗口隐藏"),
  窗口长宽: (w, h) => ipcRenderer.invoke("ea:窗口长宽", w, h),
  窗口位置: (x, y) => ipcRenderer.invoke("ea:窗口位置", x, y),
  显示主窗口: () => ipcRenderer.invoke("ea:显示主窗口"),
  设置缩放: (w, z) => ipcRenderer.invoke("ea:设置缩放", w, z),
});
