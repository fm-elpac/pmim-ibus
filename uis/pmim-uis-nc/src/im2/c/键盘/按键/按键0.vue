<script setup>
import { computed, inject } from "vue";
import c按键 from "./按键.vue";

const p = defineProps({
  类型: String,
  文本: String,
  文本2: String,
});

const shift = inject("shift", false);

const 文本 = computed(() => shift.value ? p.文本2 : p.文本);
</script>

<template>
  <c按键
    class="c-按键0"
    :类型="p.类型"
    :文本="文本"
  >
    <span>{{ 文本 }}</span>
  </c按键>
</template>

<style scoped>
.c-按键0 {
  font-size: 1.1em;
}
</style>
