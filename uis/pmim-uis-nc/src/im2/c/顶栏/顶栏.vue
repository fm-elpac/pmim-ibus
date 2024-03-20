<script setup>
import c顶栏默认 from "./顶栏默认.vue";
import c顶栏拼音 from "./顶栏拼音.vue";

const p = defineProps({
  拼音: Boolean,
  键盘: String,
});
</script>

<template>
  <div class="c-顶栏">
    <c顶栏拼音 v-if="p.拼音" />
    <c顶栏默认 :键盘="p.键盘" v-else />
  </div>
</template>

<style scoped>
.c-顶栏 {
  height: 3em;
  flex-shrink: 0;
  overflow: hidden;
}
</style>
