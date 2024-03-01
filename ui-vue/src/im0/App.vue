<script setup>
</script>

<template>
  <div class="app">
    <div class="img">
      <img src="@/assets/pmim-logo-512.png" />
    </div>
    <div class="右">胖喵拼音</div>
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
}
</style>
