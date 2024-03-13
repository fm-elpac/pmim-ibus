<script setup>
import { computed, inject } from "vue";

const p = defineProps({
  键: String,
});

const 键位 = inject("双拼键位");

const 声母 = computed(() => {
  const k = p.键.toLowerCase();
  const M = 键位.value.声母[k];
  // 零声母
  if ("" === M) {
    return "零声母";
  }
  if (null != M) {
    return M;
  }
  return "";
});

const 零声母 = computed(() => "零声母" == 声母.value);

const 韵母 = computed(() => {
  const k = p.键.toLowerCase();
  const M = 键位.value.韵母[k];
  if (null != M) {
    return M;
  }
  return [];
});
</script>

<template>
  <div class="c-键">
    <div class="容器">
      <div class="上" :class="{ 零声母 }">
        <div class="键">{{ p.键 }}</div>
        <div class="声母">{{ 声母 }}</div>
      </div>
      <div class="韵母">
        <span v-for="i in 韵母">{{ i }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-键 {
  width: 0;
  flex-grow: 1;
}

.容器 {
  border: solid 2px rgba(0, 0, 0, 0.1);
  background-color: white;

  height: 3.6em;
  padding: 0.2em;
  border-radius: 0.4em;
  margin-right: 0.2em;
  margin-bottom: 0.2em;
}

.上 {
  display: flex;
  justify-content: space-between;
}

.零声母 {
  flex-direction: column;
}

.零声母 .声母 {
  font-size: 0.8em;
  margin-top: 0.4em;
}

.键 {
  opacity: 0.8;
  line-height: 1em;
}

.声母 {
  line-height: 1em;
  color: #FF9800;
}

.韵母 {
  line-height: 1em;
  color: #2196F3;
}

.韵母 span {
  display: block;
  margin-left: 0.4em;
}
</style>
