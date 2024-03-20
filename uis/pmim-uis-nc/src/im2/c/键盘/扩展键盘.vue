<script setup>
import { inject } from "vue";
import c键盘框架 from "./键盘框架.vue";
import c按键0 from "./按键/按键0.vue";

const 扩展列表 = inject("扩展列表", []);
</script>

<template>
  <c键盘框架 class="c-扩展键盘" 滚动>
    <c按键0
      v-for="i in 扩展列表"
      class="a"
      类型="t"
      :文本="i"
    />
  </c键盘框架>
</template>

<style scoped>
.c-扩展键盘 {
  flex-direction: row;
  flex-wrap: wrap;
}

.a {
  width: auto;
  min-width: 1.6em;
  flex-shrink: 0;
  padding: 0.2em;
  height: 25%;
}
</style>
