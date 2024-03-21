<script setup>
import { inject } from "vue";

const p = defineProps({
  文本: String,
  序号: Number,
});

const 输入 = inject("输入", () => {});

function 点击() {
  输入(p.序号);
}
</script>

<template>
  <div class="c-候选项" @click="点击">
    <span>{{ p.文本 }}</span>
  </div>
</template>

<style scoped>
.c-候选项 {
  flex-shrink: 0;
  padding: 0.2em;
  margin-right: 0.4em;
  cursor: pointer;
}

.c-候选项:hover,
.c-候选项:active {
  background-color: rgba(var(--pmim-blc-p2-rgb), 0.1);
}
</style>
