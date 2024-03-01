// Android 输入适配
import { 输入管理器 } from "../输入.js";
import { aa_提交, aa可用 } from "@/api/aa/mod.js";

export class 适配a {
  constructor() {
    this._m = new 输入管理器({
      重置页码: () => {},
      提交前: async (t) => {
        if (aa可用()) {
          aa_提交(t);
        }
      },
      // 提交后
      提交: async () => {
        this._原始输入.value = "";
      },
    });

    // setup
    this._原始输入 = this._m.原始输入();
    this._候选项 = this._m.候选项();
  }

  // 用于界面显示
  显示() {
    return {
      候选: this._候选项,
      拼音上: this._m.拼音上(),
      拼音下: this._m.拼音下(),
    };
  }

  // 输入第 n 个候选项
  async 输入(n) {
    await this._m.输入(n);
  }

  // 获取原始输入
  原始输入() {
    return this._原始输入;
  }

  // 重置输入状态
  重置() {
    this._m.重置();
  }
}
