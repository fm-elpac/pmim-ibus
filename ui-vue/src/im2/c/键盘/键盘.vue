<script setup>
import c喵键盘 from "./喵键盘.vue";
import c主键盘 from "./主键盘.vue";
import c数字键盘 from "./数字键盘.vue";
import c符号键盘 from "./符号键盘.vue";
import c扩展键盘 from "./扩展键盘.vue";

const p = defineProps({
  键盘: String,
});
</script>

<template>
  <div class="c-键盘">
    <c喵键盘 v-if="'喵' == p.键盘" key="喵" />
    <c主键盘 v-if="'A' == p.键盘" 英文 key="A" />
    <c主键盘 v-if="'拼' == p.键盘" key="拼" />
    <c数字键盘 v-if="'2' == p.键盘" key="2" />
    <c符号键盘 v-if="'@' == p.键盘" key="@" />
    <c扩展键盘 v-if="'x' == p.键盘" key="x" />
  </div>
</template>

<style scoped>
.c-键盘 {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;

  padding-bottom: 0.6em;
}
</style>
