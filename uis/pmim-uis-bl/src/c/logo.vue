<script setup>
// 主图
</script>

<template>
  <div class="c-logo">
    <img src="@/assets/p-logo-v2-512.png" />
  </div>
</template>

<style scoped>
img {
  height: 100%;
  width: auto;
  aspect-ratio: 1 auto;

  animation: rotation 10s infinite linear;
  border-radius: 10%;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
