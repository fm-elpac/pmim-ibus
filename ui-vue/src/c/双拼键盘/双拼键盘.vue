<script setup>
import { computed, provide } from "vue";
import c行 from "./行.vue";

const p = defineProps({
  键盘布局: Object,
  双拼键位: Object,
});

const 双拼键位1 = computed(() => p.双拼键位);
provide("双拼键位", 双拼键位1);

const 最大长度 = computed(() => {
  const L = p.键盘布局;

  let o = 0;
  for (let i = 0; i < 3; i += 1) {
    const 长度 = L.偏移[i] + L.键位[i].length;
    if (长度 > o) {
      o = 长度;
    }
  }
  return o;
});

const 显示 = computed(() => {
  const L = p.键盘布局;

  return [0, 1, 2].map((i) => ({
    偏移: L.偏移[i],
    布局: L.键位[i],
  }));
});
</script>

<template>
  <div class="c-双拼键盘">
    <c行
      v-for="i in 显示"
      :最大长度="最大长度"
      :偏移="i.偏移"
      :布局="i.布局"
    />
  </div>
</template>

<style scoped>
</style>
