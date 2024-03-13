import { 双拼表_gbt34947, 双拼键位_gbt34947 } from "./2p_gbt34947.js";
import { 双拼表_zirjma, 双拼键位_zirjma } from "./2p_zirjma.js";
import { 双拼表_xnhe, 双拼键位_xnhe } from "./2p_xnhe.js";

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
    id: "",
    名称: "(无)",
    双拼表: {},
    双拼键位: {
      声母: {},
      韵母: {},
    },
  },
];
