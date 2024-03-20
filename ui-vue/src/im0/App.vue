<script setup>
import { onMounted } from "vue";
import { 设置缩放, 显示主窗口 } from "@/api/ea/mod.js";
import c皮肤 from "../c/皮肤.js";

onMounted(async () => {
  await 设置缩放(0, 1.4);
});

function 加载(e) {
  console.log("ui-vue im0 加载");
  console.log(e);
}
</script>

<template>
  <div class="app">
    <c皮肤
      能力="im0"
      @加载="加载"
      @显示主窗口="显示主窗口"
    />
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

  overflow: hidden;
}
</style>
