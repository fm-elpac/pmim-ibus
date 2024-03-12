<script setup>
import { ref, computed, onMounted } from "vue";
import { pm_m } from "@/api/da/mod.js";
import c页面 from "@/c/页面.vue";

// 需要加载的日期列表
const 日期列表 = computed(() => {
  const o = [];

  function 日期(d, t, n) {
    d.setTime(t - n * 24 * 60 * 60 * 1e3);
    return d.toISOString().split("T")[0];
  }

  const d = new Date();
  const t = d.getTime();
  for (let i = 0; i < 10; i += 1) {
    o.push(日期(d, t, i));
  }
  return o;
});

// 加载的原始测量数据
const 测量数据 = ref({});

onMounted(async () => {
  // 加载每一天的测量数据
  for (const i of 日期列表.value) {
    const r = await pm_m(i, 1);
    测量数据.value = Object.assign({}, 测量数据.value, {
      [i]: r,
    });
  }
});

// 要显示的测量数据
const 显示 = computed(() => {
  function f1(n) {
    if ("number" == typeof n) {
      return n.toFixed(1);
    }
    return "";
  }

  function f3(n) {
    if ("number" == typeof n) {
      return n.toFixed(3);
    }
    return "";
  }

  const o = [];
  for (const i of 日期列表.value) {
    const m = 测量数据.value[i];
    if (null != m) {
      const n = m[i];
      const 分钟 = n.分钟;
      const 字数 = n.统计["c.t"];
      const 拼音切分 = n.平均["t.p"];
      const 拼音转汉字 = n.平均["t.c"];
      const 候选项 = n.平均["i.c"];
      o.push([i, 分钟, 字数, f1(拼音切分), f1(拼音转汉字), f3(候选项)]);
    } else {
      // 无数据 (日期, 分钟, 字数, 拼音切分, 拼音转汉字, 候选项)
      o.push([i, "", "", "", "", ""]);
    }
  }
  return o;
});
</script>

<template>
  <c页面 class="v-输入测量">
    <div class="测量结果">
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>分钟</th>
            <th>字数</th>
            <th>拼音切分</th>
            <th>拼音转汉字</th>
            <th>候选项</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 显示">
            <td v-for="j in i">{{ j }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>注: 关于输入测量功能的详细解释, 请见 《多平台拼音输入法软件的开发》 文章:</p>
    <p>
      <ul>
        <li><code>https://www.bilibili.com/read/cv32669567/</code></li>
        <li><code>https://zhuanlan.zhihu.com/p/685249242</code></li>
        <li><code>https://juejin.cn/post/7343902139822211108</code></li>
        <li><code>https://blog.csdn.net/secext2022/article/details/136458045</code></li>
      </ul>
    </p>
  </c页面>
</template>

<style scoped>
.测量结果 {
  overflow-x: auto;
  margin-bottom: 1em;
}

.测量结果 table {
  min-width: 460px;
  border-collapse: collapse;
}

.测量结果 th,
.测量结果 td {
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 0.2em 0.4em;
}

.测量结果 td {
  text-align: right;
}
</style>
