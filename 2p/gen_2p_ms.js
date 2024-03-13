#!/usr/bin/env -S deno run --allow-read
// pmim-ibus/2p/gen_2p_ms.js
// 生成双拼表 (微软双拼)
//
// 命令行示例:
// > deno run --allow-read gen_2p_ms.js pinyin.txt

// 读取全拼表
async function 全拼表(文件名) {
  const 文本 = await Deno.readTextFile(文件名);
  return 文本.split("\n").map((x) => x.trim()).filter((x) => x.length > 0);
}

// 双拼规则
const 声母1 = [
  "b",
  "p",
  "m",
  "f",
  "d",
  "t",
  "n",
  "l",
  "g",
  "k",
  "h",
  "j",
  "q",
  "x",
  "r",
  "z",
  "c",
  "s",
  "y",
  "w",
];

const 声母2 = {
  "v": "zh",
  "i": "ch",
  "u": "sh",
  // 零声母
  "o": "",
};

const 韵母1 = ["a", "e", "i", "o", "u"];

const 韵母2 = {
  "b": ["ou"],
  "c": ["iao"],
  "d": ["iang", "uang"],
  "f": ["en"],
  "g": ["eng", "ng"],
  "h": ["ang"],
  "j": ["an"],
  "k": ["ao"],
  "l": ["ai"],
  "m": ["ian"],
  "n": ["in"],
  "o": ["uo"],
  "p": ["un"],
  "q": ["iu"],
  "r": ["uan", "er"],
  "s": ["ong", "iong"],
  "t": ["ue"],
  "v": ["ui", "ve"],
  "w": ["ia", "ua"],
  "x": ["ie"],
  "y": ["uai", "v"],
  "z": ["ei"],
  ";": ["ing"],
};

function 生成(全拼) {
  // 声母映射
  const 声母 = {};
  for (const i of 声母1) {
    声母[i] = i;
  }
  for (const i of Object.keys(声母2)) {
    声母[i] = 声母2[i];
  }

  // 韵母映射
  const 韵母 = {};
  for (const i of 韵母1) {
    韵母[i] = [i];
  }
  for (const i of Object.keys(韵母2)) {
    if (韵母[i] != null) {
      韵母[i] = [].concat(韵母[i]).concat(韵母2[i]);
    } else {
      韵母[i] = [].concat(韵母2[i]);
    }
  }

  // 全拼集合
  const p = {};
  for (const i of 全拼) {
    p[i] = 1;
  }

  const o = {};
  function 结果(输入, 拼音) {
    if (o[输入] != null) {
      o[输入].push(拼音);
    } else {
      o[输入] = [拼音];
    }
  }
  // 组合每一种声母和韵母 (输入)
  for (const i of Object.keys(声母)) {
    for (const j of Object.keys(韵母)) {
      const 输入 = i + j;
      for (const k of 韵母[j]) {
        const 拼音 = 声母[i] + k;
        // 检查是否为有效的拼音
        if (p[拼音]) {
          结果(输入, 拼音);
        }
      }
    }
  }

  // 特殊拼音
  结果("om", "m");

  for (const i of Object.keys(o)) {
    // 去重
    o[i] = Array.from(new Set(o[i]));
    // 排序
    o[i].sort();
  }
  // 键排序
  const a = {};
  const k = Object.keys(o);
  k.sort();
  for (const i of k) {
    a[i] = o[i];
  }
  return a;
}

function 验证(全拼, 双拼) {
  const o = {}; // 收集全拼
  for (const i of Object.keys(双拼)) {
    for (const j of 双拼[i]) {
      // 每一种输出都是有效的全拼
      if (全拼.indexOf(j) < 0) {
        throw new Error("无效的全拼 " + j);
      }
      o[j] = 1;
    }
  }
  // 双拼覆盖了所有的全拼
  const m = [];
  for (const i of 全拼) {
    if (!o[i]) {
      m.push(i);
    }
  }
  if (m.length > 0) {
    console.log(m);
    throw new Error("缺失 " + m.length + " 个全拼");
  }
}

async function main() {
  const 全拼表文件 = Deno.args[0];
  console.error(全拼表文件);

  const 全拼 = await 全拼表(全拼表文件);
  const 结果 = 生成(全拼);
  验证(全拼, 结果);

  // 清理
  for (const i of Object.keys(结果)) {
    if (结果[i].length == 1) {
      结果[i] = 结果[i][0];
    } else {
      // 提示
      console.error("重复: " + i + " -> " + 结果[i]);
    }
  }

  console.log(JSON.stringify(结果, "", "  "));
}

if (import.meta.main) main();
