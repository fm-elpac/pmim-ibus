<script setup>
import { onMounted } from "vue";
import { 初始化页面刷新 } from "@/api/da/mod.js";
import c渲染候选框 from "./候选框/渲染候选框.vue";

onMounted(async () => {
  await 初始化页面刷新();
});
</script>

<template>
  <div class="app">
    <c渲染候选框 />
  </div>
</template>

<style scoped>
.app {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}
</style>
