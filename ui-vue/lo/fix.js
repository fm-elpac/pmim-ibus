// pmim-ibus/ui-vue/lo/fix.js
//
// 用于从 dist/lo1/index.html 生成 dist/lo/index.html 文件
//
// 命令行示例:
// > deno run --allow-read dist/lo1/index.html > dist/lo/index.html

const 文件 = Deno.args[0];
const 内容 = await Deno.readTextFile(文件);

// 处理 html 的每一行
for (const i of 内容.split("\n")) {
  // 忽略空白行
  if ((null == i) || (i.trim().length < 1)) {
    continue;
  }

  // 忽略特定的行
  if (i.includes(`<link rel="preconnect" `)) {
    continue;
  }
  if (i.includes(`<link rel="preload" `)) {
    continue;
  }
  if (i.includes(`<script type="module" `)) {
    continue;
  }
  if (i.includes(`<link rel="modulepreload" `)) {
    continue;
  }

  // 去除 `crossorigin`
  if (i.includes(`<link rel="stylesheet" `)) {
    const j = i.split("crossorigin").join("");
    console.log(j);

    continue;
  }

  // 添加行
  if (i.includes(`</body>`)) {
    console.log(`    <script src="./bundle.js"></script>`);
  }

  // 原样输出行
  console.log(i);
}
