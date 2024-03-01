<script setup>
import { use加载 } from "./hook.js";

use加载();
</script>

<template>
  <div class="app">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="120"
      :width="16"
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

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
