<script setup>
import { onMounted } from "vue";
import { 设置缩放, 显示主窗口 } from "@/api/ea/mod.js";

onMounted(async () => {
  await 设置缩放(0, 1.4);
});

async function 显示() {
  await 显示主窗口();
}
</script>

<template>
  <div class="app">
    <div class="img">
      <img src="@/assets/pmim-logo-512.png" />
    </div>
    <div class="右">
      <span>胖喵拼音</span>
      <div class="按钮" title="设置" @click="显示">
        <v-icon icon="mdi-cog-outline" />
      </div>
    </div>
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

  background-color: #FFF3E0;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 8px;
  border: solid 4px #FF9800;

  display: flex;
}

.img {
  flex-shrink: 0;
  /* 拖动窗口区域 */
  -webkit-app-region: drag;
}

.img img {
  height: 100%;
  width: 64px;
}

.右 {
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 16px;
  margin: 4px 8px;

  display: flex;
}

.右 span {
  flex-grow: 1;
}

.按钮 {
  opacity: 0.6;
  cursor: pointer;
}

.按钮:hover {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}
</style>
