// 输入管理器 (通用)
import { computed, ref, watch } from "vue";
import { pm_commit, pm_p2c, pm_pin_yin } from "@/api/da/mod.js";
import { u切分 } from "@/util/uu.js";

// 测量时间 (Date) 返回 ms
function 测量时间(d1, d2) {
  return d2.getTime() - d1.getTime();
}

export class 输入管理器 {
  // 回调: {
  //   重置页码: () => () // 候选项更新后回调
  //   提交: async (文本) => () // 提交文本后回调
  //   提交前: async (文本) => () // 提交文本前回调
  // }
  constructor(回调) {
    this._回调 = 回调;
    // setup

    //# 内部状态

    // 忙碌锁: 在该状态, 输入管理器忽略所有外部操作
    // 为了修复 BUG: 连续输入多次内容 (文本)
    this._忙 = false;

    // 用户的原始输入 (字符串)
    this._原始输入 = ref("");
    // pm_pin_pin() 返回的结果
    this._拼音 = ref({
      // 已经切分的部分
      p: [],
      // 剩余无法切分的部分
      r: undefined,
    });
    // pm_p2c() 返回的结果
    this._候选项 = ref([]);

    // 当前输入状态
    this._已输入汉字 = ref([]);

    //# 计算状态

    // _原始输入 对应的双拼
    // 只返回已经成功切分的双拼
    this._双拼 = computed(() => {
      const p = this._原始输入.value;
      const o = [];
      for (let i = 0; i < (this._拼音.value.p.length * 2); i += 2) {
        o.push(p.slice(i, i + 2));
      }
      return o;
    });

    // _拼音 对应的全拼
    this._全拼 = computed(() =>
      this._拼音.value.p.map((x) => {
        // 只取第一个拼音
        if (x instanceof Array) {
          x = x[0];
        }
        // 双拼 (自然码) 修复: lo -> luo
        if ("lo" == x) {
          x = "luo";
        }
        return x;
      })
    );

    this._已输入字数 = computed(() =>
      this._已输入汉字.value.map((x) => u切分(x).length).reduce(
        (a, b) => a + b,
        0,
      )
    );

    // 使用切分后的拼音 (pm_pin_yin 返回结果)
    this._剩余拼音 = computed(() => {
      const 列表 = this._拼音.value.p;
      return 列表.slice(this._已输入字数.value, 列表.length);
    });

    this._已输入全拼 = computed(() => {
      const 字数 = this._已输入字数.value;
      return this._全拼.value.slice(0, 字数);
    });

    this._剩余双拼 = computed(() => {
      const 列表 = this._双拼.value;
      return 列表.slice(this._已输入字数.value, 列表.length);
    });

    //# 显示状态
    this._显示_拼音上 = computed(() => this._全拼.value.join("'") + " ");

    // 返回值: Array<string>
    // [已输入汉字, 剩余双拼, 剩余原始输入]
    this._显示_拼音下 = computed(() => {
      const 已输入汉字 = this._已输入汉字.value.join("");
      const 剩余双拼 = this._剩余双拼.value.join(" ");
      let 剩余原始输入 = "";

      const { r } = this._拼音.value;
      if (null != r) {
        剩余原始输入 = r;
      }
      return [已输入汉字, 剩余双拼, 剩余原始输入];
    });

    // 状态变更处理
    watch(this._原始输入, async (新, 旧) => {
      if (旧 != 新) {
        await this._更新输入(新);
      }
    });

    // 输入测量 (统计) 功能

    // 候选项序号
    this._m_i = [];
    // 拼音切分 响应时间 (ms)
    this._mt_pin_yin = [];
    // 拼音转汉字 响应时间 (ms)
    this._mt_p2c = [];
  }

  // 原始输入
  原始输入() {
    return this._原始输入;
  }

  // 当前候选项
  候选项() {
    return this._候选项;
  }

  // 显示状态
  拼音上() {
    return this._显示_拼音上;
  }

  拼音下() {
    return this._显示_拼音下;
  }

  // 重置输入状态
  重置() {
    this._原始输入.value = "";
    this._拼音.value = { p: [] };
    this._候选项.value = [];
    this._已输入汉字.value = [];

    this._m_i = [];
    this._mt_pin_yin = [];
    this._mt_p2c = [];
  }

  _忙碌锁定() {
    this._忙 = true;
  }

  _忙碌解锁() {
    this._忙 = false;
  }

  // 处理提交 (已经确定要提交)
  async _提交() {
    // 要输入的文本
    const t = this._已输入汉字.value.join("");
    if (t.length < 1) {
      // 没有输入内容
      return;
    }

    // 提前保存提交数据
    const 提交数据 = {
      t,
      pin_yin: this._已输入全拼.value,
      c: "c",

      // 输入测量功能
      m_i: this._m_i,
      mt_pin_yin: this._mt_pin_yin,
      mt_p2c: this._mt_p2c,
    };

    // 不再等待提交完毕
    const 非阻塞提交 = async () => {
      // 提交前回调
      await this._回调.提交前(t);
      // 提交
      await pm_commit(提交数据);
      // 提交后回调
      await this._回调.提交(t);
    };
    非阻塞提交();

    // 重置输入状态
    this.重置();
  }

  // 根据拼音查询新的候选项
  async _更新候选项(pin_yin) {
    if (pin_yin.length < 1) {
      // 忽略 0 长度
      this._候选项.value = [];
      this._回调.重置页码();
      return;
    }

    // 输入测量
    const d1 = new Date();
    const { c } = await pm_p2c(pin_yin);
    const d2 = new Date();
    this._mt_p2c.push(测量时间(d1, d2));

    this._候选项.value = c;
    this._回调.重置页码();
  }

  // 输入第 N 个候选项
  async 输入(n) {
    // 忙碌锁
    if (this._忙) {
      return;
    }
    this._忙碌锁定();

    // 检查候选项
    if (n >= this._候选项.value.length) {
      this._忙碌解锁();
      return;
    }
    const 项 = this._候选项.value[n];
    if ((null == 项) || (项.length < 1)) {
      this._忙碌解锁();
      return;
    }

    // 如果拼音切分错误, 禁止输入
    const { r } = this._拼音.value;
    if ((null != r) && (r.length > 0)) {
      this._忙碌解锁();
      return;
    }

    // 输入候选项
    this._已输入汉字.value.push(项);
    // 输入测量
    this._m_i.push(n);
    // 检查是否输入完毕
    const p = this._剩余拼音.value;
    if (p.length > 0) {
      // 再次查询
      await this._更新候选项(p);
    } else {
      // 输入完毕, 提交
      await this._提交();
    }

    this._忙碌解锁();
  }

  // 调用接口进行拼音切分
  async _拼音切分(新) {
    // 输入测量
    const d1 = new Date();
    const r1 = await pm_pin_yin(新);
    const d2 = new Date();
    this._mt_pin_yin.push(测量时间(d1, d2));

    // 只处理第一个拼音结果
    const r = r1.pin_yin[0];
    this._拼音.value = r;
    return r;
  }

  // 用户原始输入的拼音变更
  async _更新输入(新) {
    // 检查拼音为空
    if (新.length < 1) {
      this.重置();
      return;
    }

    const { r } = await this._拼音切分(新);
    // 如果拼音切分错误, 不再查询
    if ((null != r) && (r.length > 0)) {
      return;
    }

    await this._更新候选项(this._剩余拼音.value);
  }
}
