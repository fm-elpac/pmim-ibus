<script setup>
// pmim-uis-nc-im0: PC 固定工具条界面
import { onMounted } from "vue";
import { fixVuetify } from "../util/fixVuetify.js";
// 首先执行修复
fixVuetify();

const p = defineProps({
  "data-ce": String,
});

const emit = defineEmits(["加载", "显示主窗口"]);

onMounted(() => emit("加载"));

function 显示() {
  emit("显示主窗口");
}

// DEBUG
console.log("pmim-uis-nc im0 setup");
console.log(p.dataCe);
</script>

<template>
  <div class="pmim-uis-nc-im0">
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
.pmim-uis-nc-im0 {
  width: 100%;
  height: 100%;

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
  width: auto;
  aspect-ratio: 1 auto;
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
