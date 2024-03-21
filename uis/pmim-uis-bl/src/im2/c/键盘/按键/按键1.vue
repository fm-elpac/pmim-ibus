<script setup>
import c按键 from "./按键.vue";

const p = defineProps({
  类型: String,
  文本: String,
  激活: Boolean,
});
</script>

<template>
  <div class="c-按键1">
    <c按键
      :class="{ '激活': p.激活 }"
      :类型="p.类型"
      :文本="p.文本"
    >
      <slot />
    </c按键>
  </div>
</template>

<style scoped>
.c-按键1 {
  box-sizing: border-box;
  display: flex;
  align-items: stretch;

  opacity: 0.8;
  font-size: 0.8em;
}

.c-按键1:hover,
.c-按键1:active {
  opacity: 1;
}

.激活 {
  color: var(--pmim-blc-p1);
  font-size: 1.2em;
}

.c-按键 {
  border: solid 1.2px rgba(var(--pmim-blc-p2-rgb), 0.2);
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
