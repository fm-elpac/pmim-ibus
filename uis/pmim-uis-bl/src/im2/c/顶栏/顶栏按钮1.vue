<script setup>
import { computed, inject } from "vue";
import c顶栏按钮 from "./顶栏按钮.vue";

const p = defineProps({
  文本: String,
  键盘: String,
});

const 激活 = computed(() => {
  if ("。" == p.文本) {
    return "x" == p.键盘;
  }
  return p.文本 == p.键盘;
});

const 设键盘 = inject("设键盘");

function 点击() {
  if ("。" == p.文本) {
    设键盘("x");
  } else {
    设键盘(p.文本);
  }
}
</script>

<template>
  <c顶栏按钮
    :激活="激活"
    @点击="点击"
  >
    <span>{{ p.文本 }}</span>
  </c顶栏按钮>
</template>

<style scoped>
.c-顶栏按钮 {
  width: 1.6em;
  font-size: 1.2em;
}

.c-顶栏按钮:hover,
.c-顶栏按钮:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
