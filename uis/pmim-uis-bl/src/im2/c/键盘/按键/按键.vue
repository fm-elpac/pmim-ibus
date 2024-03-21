<script setup>
import { inject } from "vue";

const p = defineProps({
  类型: String,
  文本: String,
});

const 按键点击 = inject("按键点击", () => {});

function 点击() {
  按键点击(p.类型, p.文本);
}
</script>

<template>
  <div class="c-按键" @click="点击">
    <slot />
  </div>
</template>

<style scoped>
.c-按键 {
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  width: 0;
  box-sizing: border-box;

  user-select: none;
  transition-property: background-color, color, text-shadow;
  transition-duration: 1s;
}

.c-按键:active {
  font-weight: bold;
  background-color: rgba(var(--pmim-blc-p2-rgb), 0.1);
  color: var(--pmim-blc-p2);
  text-shadow: 0 0 4px rgba(var(--pmim-blc-p2-rgb), 0.4);
  transition-duration: 0s;
}
</style>
