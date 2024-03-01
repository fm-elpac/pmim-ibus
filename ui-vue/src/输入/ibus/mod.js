// ibus 输入适配
import { computed, onMounted, ref } from "vue";
import { ibus_sse, pm_f } from "@/api/da/mod.js";
import { 输入管理器 } from "../输入.js";
import { 窗口管理器 } from "./w.js";

export class 适配ibus {
  constructor() {
    this._w = new 窗口管理器({
      显示回调: async () => {
        // 每次现实窗口的时候都启用输入反馈
        await this._f1();
      },
    });
    this._m = new 输入管理器({
      重置页码: () => {
        this._页码.value = 0;
      },
      提交: async () => {
        await this._f2();
      },
      提交前: async () => {},
    });

    // 每页的候选项个数
    this.每页 = 10;

    // setup
    onMounted(async () => {
      this._s = await ibus_sse();
      this._s.onmessage = (e) => {
        const 消息 = JSON.parse(e.data);
        this.处理(消息);
      };

      await this._f1();
    });

    this._原始输入 = this._m.原始输入();
    this._候选项 = this._m.候选项();

    // 翻页功能
    this._页码 = ref(0);

    // 候选项总页数
    this._总页数 = computed(() =>
      Math.ceil(this._候选项.value.length / this.每页)
    );

    this._显示_页码 = computed(() => {
      if (this._候选项.value.length < 1) {
        return 0;
      }
      return this._页码.value + 1;
    });

    // 当前页候选项
    this._显示_候选项 = computed(() => {
      const 列表 = this._候选项.value;
      const 页码 = this._页码.value;
      return 列表.slice(页码 * this.每页, (页码 + 1) * this.每页);
    });
  }

  // 用于界面显示
  显示() {
    return {
      页码: this._显示_页码,
      总页数: this._总页数,
      候选: this._显示_候选项,
      拼音上: this._m.拼音上(),
      拼音下: this._m.拼音下(),
    };
  }

  // 输入反馈功能

  // 启用输入反馈
  async _f1() {
    await pm_f(1);
  }

  // 重置输入状态
  async _f2() {
    await pm_f(2);
  }

  // 英文输入模式
  async _f3() {
    await pm_f(3);
  }

  // 禁用退格键
  async _f4() {
    await pm_f(4);
  }

  // 启用退格键
  async _f5() {
    await pm_f(5);
  }

  // 处理候选项翻页
  async _翻页(d) {
    const 总页数 = this._总页数.value;
    let 新页码 = this._页码.value + d;
    if (新页码 < 0) {
      新页码 = 0;
    }
    if (新页码 > (总页数 - 1)) {
      新页码 = 总页数 - 1;
    }
    this._页码.value = 新页码;
  }

  // 输入某个候选项
  async _输入(n) {
    // 计算候选项序号
    await this._m.输入(this._页码.value * this.每页 + n);
  }

  // 处理 ibus 发来的消息
  async 处理(消息) {
    await this._w.处理(消息);

    if ("K" == 消息.类型) {
      // 只处理按键按下
      if (消息.键按下) {
        switch (消息.键值) {
          case ",":
            // 上一页
            await this._翻页(-1);
            break;
          case ".":
            // 下一页
            await this._翻页(1);
            break;
          case " ":
            // 输入第 1 项
            await this._输入(0);
            break;
          case "1":
            // 输入第 1 项
            await this._输入(0);
            break;
          case "2":
            // 输入第 2 项
            await this._输入(1);
            break;
          case "3":
            // 输入第 3 项
            await this._输入(2);
            break;
          case "4":
            // 输入第 4 项
            await this._输入(3);
            break;
          case "5":
            // 输入第 5 项
            await this._输入(4);
            break;
          case "6":
            // 输入第 6 项
            await this._输入(5);
            break;
          case "7":
            // 输入第 7 项
            await this._输入(6);
            break;
          case "8":
            // 输入第 8 项
            await this._输入(7);
            break;
          case "9":
            // 输入第 9 项
            await this._输入(8);
            break;
          case "0":
            // 输入第 10 项
            await this._输入(9);
            break;
        }
      }
    } else if ("T" == 消息.类型) {
      this._原始输入.value = 消息.文本;
      // 重置输入状态
      if (消息.文本.length < 1) {
        this._m.重置();
      }
    }
  }
}
