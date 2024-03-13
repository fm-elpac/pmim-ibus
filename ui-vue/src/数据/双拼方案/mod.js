import { 双拼表_gbt34947, 双拼键位_gbt34947 } from "./2p_gbt34947.js";
import { 双拼表_zirjma, 双拼键位_zirjma } from "./2p_zirjma.js";
import { 双拼表_xnhe, 双拼键位_xnhe } from "./2p_xnhe.js";
import { 双拼表_ms, 双拼键位_ms } from "./2p_ms.js";
import { 双拼表_sogou, 双拼键位_sogou } from "./2p_sogou.js";

export const 双拼方案列表 = [
  {
    id: "2p_gbt34947",
    名称: "国家标准双拼 (GB/T 34947-2017)",
    双拼表: 双拼表_gbt34947,
    双拼键位: 双拼键位_gbt34947,
  },
  {
    id: "2p_zirjma",
    名称: "自然码",
    双拼表: 双拼表_zirjma,
    双拼键位: 双拼键位_zirjma,
  },
  {
    id: "2p_xnhe",
    名称: "小鹤双拼",
    双拼表: 双拼表_xnhe,
    双拼键位: 双拼键位_xnhe,
  },
  {
    id: "2p_ms",
    名称: "微软双拼",
    双拼表: 双拼表_ms,
    双拼键位: 双拼键位_ms,
  },
  {
    id: "2p_sogou",
    名称: "搜狗双拼",
    双拼表: 双拼表_sogou,
    双拼键位: 双拼键位_sogou,
  },
  {
    id: "",
    名称: "(无)",
    双拼表: {},
    双拼键位: {
      声母: {},
      韵母: {},
    },
  },
];
