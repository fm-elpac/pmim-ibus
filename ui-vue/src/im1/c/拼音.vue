<script setup>
const p = defineProps({
  上: String,
  下: String,
});
</script>

<template>
  <div class="c-拼音">
    <div class="p2">{{ p.上 }}</div>
    <div class="p1">{{ p.下 }}</div>
  </div>
</template>

<style scoped>
.p2 {
  font-size: 16px;
  opacity: 0.6;
}

.p1 {
  font-size: 24px;
  word-spacing: -0.2em;
}
</style>
