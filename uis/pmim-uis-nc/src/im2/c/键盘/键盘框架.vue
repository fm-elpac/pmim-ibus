<script setup>
const p = defineProps({
  滚动: Boolean,
});
</script>

<template>
  <div class="c-键盘框架" :class='{ "滚动": p.滚动 }'>
    <slot />
  </div>
</template>

<style scoped>
.c-键盘框架 {
  height: 100%;

  display: flex;
  flex-direction: column;
}

.滚动 {
  overflow-y: auto;
}
</style>
