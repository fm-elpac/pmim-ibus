<script setup>
import { ref, watch } from "vue";

const p = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function 更新(t) {
  emit("update:modelValue", t);
}

const 值 = ref(p.modelValue);

watch(值, () => {
  更新(值.value);
});
</script>

<template>
  <div class="c-文本区域">
    <textarea v-model="值" spellcheck="false" />
  </div>
</template>

<style scoped>
.c-文本区域 {
  margin: 0.6em 0;
}

.c-文本区域 textarea {
  width: 100%;
  background-color: white;
  padding: 0.6em;
  min-height: 20em;
}
</style>
