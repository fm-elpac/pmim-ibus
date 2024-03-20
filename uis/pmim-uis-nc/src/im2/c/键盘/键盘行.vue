<script setup>
</script>

<template>
  <div class="c-键盘行">
    <slot />
  </div>
</template>

<style scoped>
.c-键盘行 {
  height: 25%;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  align-items: stretch;
}
</style>
