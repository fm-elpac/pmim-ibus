// 窗口管理器 (ibus)
import {
  窗口位置,
  窗口显示,
  窗口显示0,
  窗口隐藏,
  窗口隐藏0,
} from "@/api/ea/mod.js";

export class 窗口管理器 {
  // 回调: {
  //   显示回调: () => () // 显示窗口后的回调
  // }
  constructor(回调) {
    this._回调 = 回调;

    // 窗口显示状态
    this._实际显示 = false;
    this._应该显示 = false;

    // 光标位置
    this._光标 = [0, 0, 0, 0];
    // 输入的拼音长度
    this._输入长度 = 0;

    // 窗口长宽
    this.长宽 = [1000, 200];

    // 窗口距离光标的像素
    this.距光标 = [0, 16];
    // 窗口距离屏幕边的像素
    this.距屏幕 = 32;
  }

  // 在显示窗口之前, 重新设置窗口位置
  async _定位窗口() {
    // 获得屏幕长宽
    const 屏幕 = [window.screen.width, window.screen.height];

    // y: 首先尝试选择光标下方位置
    let y = this._光标[1] + this._光标[3] + this.距光标[1];
    // 检查窗口下方距离屏幕边界
    const 下 = y + this.长宽[1] + this.距屏幕;
    if (下 > 屏幕[1]) {
      // 超出, 改成光标上方
      y = this._光标[1] - this.长宽[1] - this.距光标[1];
    }

    // x: 首先选择和光标对齐
    let x = this._光标[0] + this.距光标[0];
    // 检查窗口右边距离屏幕边界
    const 右 = x + this.长宽[0] + this.距屏幕;
    if (右 > 屏幕[0]) {
      // 超出, 改成右侧和屏幕对齐
      x = 屏幕[0] - this.长宽[0] - this.距屏幕;
    }

    // 移动窗口
    await 窗口位置(x, y);
  }

  async _显示窗口() {
    await this._定位窗口();
    await 窗口显示();
    this._实际显示 = true;

    this._回调.显示回调();
  }

  async _隐藏窗口() {
    await 窗口隐藏();
    this._实际显示 = false;
  }

  // 处理窗口位置和显示 / 隐藏
  async _检查窗口() {
    if (this._实际显示) {
      if (!this._应该显示) {
        await this._隐藏窗口();
        return;
      }

      if (this._输入长度 < 1) {
        await this._隐藏窗口();
      }
    } else if (this._应该显示) {
      if (
        ((0 != this._光标[0]) || (0 != this._光标[1])) && (this._输入长度 > 0)
      ) {
        await this._显示窗口();
      }
    }
  }

  // 处理 ibus 发来的消息
  async 处理(消息) {
    // 更新状态
    if ("S" == 消息.类型) {
      switch (消息.文本) {
        case "focus_in":
          this._应该显示 = true;
          break;
        case "focus_out":
          this._应该显示 = false;
          break;
        case "disable":
          this._应该显示 = false;
          // TODO 窗口0 ?
          break;
        case "enable":
          // TODO 窗口0 ?
          break;
      }
    } else if ("C" == 消息.类型) {
      if ((0 != 消息.x) || (0 != 消息.y)) {
        this._光标 = [消息.x, 消息.y, 消息.w, 消息.h];
      }
    } else if ("T" == 消息.类型) {
      this._输入长度 = 消息.文本.length;
    } else {
      // 忽略消息
      return;
    }

    await this._检查窗口();
  }
}
