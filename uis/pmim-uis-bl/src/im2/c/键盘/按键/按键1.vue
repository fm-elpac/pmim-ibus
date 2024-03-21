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
      :class="{ '激活': p.激活, 'text-medium-emphasis': !p.激活 }"
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
  color: rgb(var(--v-theme-primary));
  font-size: 1.2em;
}

.c-按键 {
  border: solid 1.2px rgba(var(--v-border-color), var(--v-border-opacity));
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
