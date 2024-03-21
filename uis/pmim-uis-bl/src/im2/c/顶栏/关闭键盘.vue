<script setup>
import { inject } from "vue";
import c顶栏按钮 from "./顶栏按钮.vue";

const 关闭键盘 = inject("关闭键盘", () => {});

function 点击() {
  关闭键盘();
}
</script>

<template>
  <c顶栏按钮 @点击="点击">
    <v-icon icon="mdi-keyboard-close" />
  </c顶栏按钮>
</template>

<style scoped>
.c-顶栏按钮 {
  width: 3em;
  font-size: 0.8em;
  opacity: 0.8;
}

.c-顶栏按钮:hover,
.c-顶栏按钮:active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
