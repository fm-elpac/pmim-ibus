// pmim-ibus/uis/patch/fix_font_name.js
//
// 命令行示例:
// > deno run -A fix_font_name.js node_modules/@mdi/font/css/materialdesignicons.css pmim-ui

const N = "Material Design Icons";

const 文件 = Deno.args[0];
const 名称 = Deno.args[1];
const 内容 = await Deno.readTextFile(文件);

const 文本 = 内容.split(N).join(名称 + " " + N);
await Deno.writeTextFile(文件, 文本);
