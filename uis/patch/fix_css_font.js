// pmim-ibus/uis/patch/fix_css_font.js
//
// 命令行示例:
// > deno run -A fix_css_font.js dist/style.css

const A = `@font-face{`;
//const A = `font-family:Material Design Icons;`;
const B =
  `src: url("./materialdesignicons-webfont.woff2?v=7.4.47") format("woff2");`;

const 文件 = Deno.args[0];
//const 名称 = Deno.args[1];
const 内容 = await Deno.readTextFile(文件);

const 文本 = 内容.split(A).join(A + B);
await Deno.writeTextFile(文件, 文本);
