<script setup>
import { computed } from "vue";
import c键 from "./键.vue";

const p = defineProps({
  最大长度: Number,
  偏移: Number,
  布局: Array,
});

const 占位长度 = computed(() => p.最大长度 - p.布局.length - p.偏移);
</script>

<template>
  <div class="c-行">
    <div
      class="偏移"
      :style="{ 'flex-grow': p.偏移 }"
    />

    <c键
      v-for="i in p.布局"
      :键="i"
    />

    <div
      class="占位"
      :style="{ 'flex-grow': 占位长度 }"
    />
  </div>
</template>

<style scoped>
.c-行 {
  display: flex;
}

.偏移,
.占位 {
  width: 0;
}
</style>
