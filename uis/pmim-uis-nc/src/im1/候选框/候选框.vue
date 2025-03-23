<script setup>
// 候选框: 静态显示的组件
import c左 from "../c/左.vue";

const p = defineProps({
  页码: Number,
  总页数: Number,
  拼音上: String,
  拼音下: Array,
  候选: Array,
});
</script>

<template>
  <div class="c-候选框">
    <c左
      class="左"
      :页码="p.页码"
      :总页数="p.总页数"
      :拼音上="p.拼音上"
      :拼音下="p.拼音下"
      :候选="p.候选"
    />

    <div class="img">
      <img src="@/assets/pmim-logo-512.png" />
    </div>
  </div>
</template>

<style scoped>
.c-候选框 {
  width: 100%;
  height: 100%;

  background-color: #fff3e0;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 8px;
  border: solid 4px #ff9800;

  display: flex;

  font-family: monospace;
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

.左 {
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
