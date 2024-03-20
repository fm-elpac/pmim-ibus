<script setup>
const p = defineProps({
  上: String,
  下: Array,
});
</script>

<template>
  <div class="c-拼音">
    <div class="p2">{{ p.上 }}</div>
    <div class="p1">
      <span class="x0" v-if="p.下[0].length > 0">{{ p.下[0] }}</span>
      <span class="x1">{{ p.下[1] }}</span>
      <span class="x2">{{ p.下[2] }}</span>
    </div>
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

.x0,
.x1 {
  margin-right: 0.4em;
}

.x2 {
  opacity: 0.4;
}
</style>
