export const 配置项_皮肤 = "ui.s";

export function onLoad(e) {
  return new Promise((resolve, reject) => {
    e.addEventListener("load", resolve);
    e.addEventListener("error", reject);
  });
}

export async function 加载js(插件) {
  const 入口 = 插件.描述.皮肤.入口;

  // 修复 js 运行环境
  window.process = {
    env: {},
  };

  const e = document.createElement("script");
  e.src = `/plugin/${插件.id}/${入口}`;
  // DEBUG
  console.log("加载 js: " + e.src);

  document.head.appendChild(e);

  // 加载字体
  const fontface = 插件.描述.皮肤.fontface;
  if (null != fontface) {
    for (let i of fontface) {
      // 替换路径
      const src = i.src.split("static/").join(`/plugin/${插件.id}/`);

      const f = new FontFace(i.family, src, i.desc);
      // DEBUG
      console.log("加载字体: " + src);
      console.log(f);

      document.fonts.add(f);
    }
  }

  // 等待 js 加载
  await onLoad(e);
}

export async function 加载2(插件, element) {
  // 加载 css
  const css = 插件.描述.皮肤.css;
  if (null != css) {
    for (let i of css) {
      const e = document.createElement("link");
      e.rel = "stylesheet";
      e.type = "text/css";
      e.href = `/plugin/${插件.id}/${i}`;
      // DEBUG
      console.log("加载 css: " + e.href);

      element.shadowRoot.appendChild(e);
    }
  }
}
