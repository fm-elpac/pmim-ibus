import { 键盘布局PC_qwerty, 键盘布局手机_qwerty } from "./qwerty.js";
import { 键盘布局PC_abcd7109, 键盘布局手机_abcd7109 } from "./abcd7109.js";
import { 键盘布局PC_dvorak, 键盘布局手机_dvorak } from "./dvorak.js";

export const 键盘布局列表 = [
  {
    id: "qwerty",
    名称: "qwerty",
    PC: 键盘布局PC_qwerty,
    手机: 键盘布局手机_qwerty,
  },
  {
    id: "abcd7109",
    名称: "abcd7109",
    PC: 键盘布局PC_abcd7109,
    手机: 键盘布局手机_abcd7109,
  },
  {
    id: "dvorak",
    名称: "dvorak",
    PC: 键盘布局PC_dvorak,
    手机: 键盘布局手机_dvorak,
  },
];
