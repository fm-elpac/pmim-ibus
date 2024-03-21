<script setup>
import c顶栏按钮1 from "./顶栏按钮1.vue";
import c关闭键盘 from "./关闭键盘.vue";

const p = defineProps({
  键盘: String,
});
</script>

<template>
  <div class="c-顶栏默认">
    <c顶栏按钮1 文本="喵" :键盘="p.键盘" />
    <c顶栏按钮1 文本="A" :键盘="p.键盘" />
    <c顶栏按钮1 文本="拼" :键盘="p.键盘" />
    <c顶栏按钮1 文本="2" :键盘="p.键盘" />
    <c顶栏按钮1 文本="@" :键盘="p.键盘" />
    <c顶栏按钮1 文本="。" :键盘="p.键盘" />

    <div class="空白" />
    <c关闭键盘 />
  </div>
</template>

<style scoped>
.c-顶栏默认 {
  height: 100%;
  display: flex;
  align-items: stretch;
}

.空白 {
  flex-grow: 1;
}
</style>
