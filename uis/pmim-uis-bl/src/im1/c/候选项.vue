<script setup>
import { computed } from "vue";

const p = defineProps({
  候选: Array,
});

const 显示 = computed(() => {
  const 列表 = p.候选;

  const 序号 = ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "0."];
  const o = [];
  for (let i = 0; i < 列表.length; i += 1) {
    o.push(`${序号[i]}${列表[i]}`);
  }
  return o;
});
</script>

<template>
  <div class="c-候选项">
    <div v-for="i in 显示" class="项">{{ i }}</div>
  </div>
</template>

<style scoped>
.c-候选项 {
  display: flex;
  flex-wrap: wrap;

  font-size: 20px;
  padding: 4px;
}

.项 {
  margin-right: 0.4em;
  opacity: 0.8;
}

.项:first-child {
  font-weight: bold;
  opacity: 1;

  text-shadow: 0 0 4px rgba(var(--pmim-blc-p2-rgb), 0.8);
}
</style>
