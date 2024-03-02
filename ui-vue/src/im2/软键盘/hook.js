import { computed, onMounted, ref, watch } from "vue";
import { 默认符号列表 } from "../c/键盘/键盘布局.js";
import { 适配a } from "../../输入/a/mod.js";
import {
  aa_发送键_回车,
  aa_发送键_退格,
  aa_提交,
  aa_隐藏键盘,
  aa可用,
} from "@/api/aa/mod.js";
import { pm_commit, pm_li } from "@/api/da/mod.js";

export function use输入() {
  // Android 输入适配器
  const a = new 适配a();

  const 原始输入 = a.原始输入();
  const { 候选, 拼音上, 拼音下 } = a.显示();

  // 状态

  // 拼音输入模式
  const 拼音 = computed(() => 原始输入.value.length > 0);
  // 当前显示的键盘
  const 键盘 = ref("拼");
  // 符号键盘显示的内容
  const 符号列表 = ref(默认符号列表);
  // 扩展键盘 (0) 显示的内容
  const 扩展列表 = ref([]);

  function 设键盘(v) {
    键盘.value = v;
  }

  function 关闭键盘() {
    console.log("关闭键盘");

    aa_隐藏键盘();
  }

  async function 加载符号列表() {
    const { c } = await pm_li("a");
    符号列表.value = c;
  }

  async function 加载扩展列表() {
    const { c } = await pm_li("o", 0);
    扩展列表.value = c;
  }

  // 初始加载
  onMounted(async () => {
    await 加载符号列表();
    await 加载扩展列表();
  });

  // 每次离开键盘后刷新
  watch(键盘, async (新, 旧) => {
    if (新 != 旧) {
      if ("@" == 旧) {
        await 加载符号列表();
      } else if ("x" == 旧) {
        await 加载扩展列表();
      }
    }
  });

  // 只允许输入 `a` ~ `z`
  function 检查az(t) {
    if (t.length > 1) {
      return false;
    }
    const 码 = t.charCodeAt(0);
    if ((码 < "a".charCodeAt(0)) || (码 > "z".charCodeAt(0))) {
      return false;
    }
    return true;
  }

  async function 按键点击(c, t) {
    // 检查拼音模式
    if ("t" == c) {
      if (拼音.value) {
        // 空格键输入第一个候选项
        if ((" " == t) && (候选.value.length > 0)) {
          await a.输入(0);
          return;
        }

        if (!检查az(t)) {
          return;
        }

        原始输入.value += t;
        return;
      }
      // 当前在拼音键盘
      if ("拼" == 键盘.value) {
        if (检查az(t)) {
          原始输入.value += t;
          return;
        }
      }

      // 输入字符
      if (aa可用()) {
        aa_提交(t);
      }

      // 符号键盘, 更新频率
      if ("@" == 键盘.value) {
        await pm_commit({
          t,
          c: "a",
        });
      } else if ("x" == 键盘.value) {
        await pm_commit({
          t,
          c: "o",
          o_id: 0,
        });
      }
    } else if ("退格" == c) {
      if (拼音.value) {
        // 删除输入的一个字符
        const v = 原始输入.value;
        原始输入.value = v.slice(0, v.length - 1);
        return;
      }

      aa_发送键_退格();
    } else if ("回车" == c) {
      if (拼音.value) {
        // 忽略按键
        return;
      }

      aa_发送键_回车();
    } else if ("清除" == c) {
      // 重置原始输入
      原始输入.value = "";
    }
  }

  // 输入第 n 个候选项
  async function 输入(n) {
    await a.输入(n);
  }

  return {
    拼音,
    键盘,
    符号列表,
    扩展列表,
    拼音上,
    拼音下,
    候选,
    设键盘,
    关闭键盘,
    按键点击,
    输入,
  };
}
