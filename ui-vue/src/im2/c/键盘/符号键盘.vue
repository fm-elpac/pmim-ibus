<script setup>
import { inject, computed } from "vue";
import c键盘框架 from "./键盘框架.vue";
import c键盘行 from "./键盘行.vue";
import c按键0 from "./按键/按键0.vue";

// 每行 8 个, 共 32 个
const 符号列表 = inject("符号列表", []);

const 行 = computed(() => {
  const 列表 = 符号列表.value;
  const o = [];
  const N = 8;
  for (let i = 0; i < 列表.length; i += N) {
    o.push(列表.slice(i, i + N));
  }
  // 显示 4 行
  while (o.length < 4) {
    o.push([]);
  }
  return o;
});
</script>

<template>
  <c键盘框架 class="c-符号键盘">
    <c键盘行 v-for="j in [0, 1, 2, 3]">
      <c按键0
        v-for="i in 行[j]"
        class="w1"
        类型="t"
        :文本="i"
      />
    </c键盘行>
  </c键盘框架>
</template>

<style scoped>
.w1 {
  flex-grow: 1;
}
</style>
