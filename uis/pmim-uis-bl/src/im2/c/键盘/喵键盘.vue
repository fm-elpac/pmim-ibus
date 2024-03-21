<script setup>
import cLogo from "@/c/logo.vue";
import c键盘框架 from "./键盘框架.vue";
</script>

<template>
  <c键盘框架 class="c-喵键盘">
    <cLogo />
  </c键盘框架>
</template>

<style scoped>
.c-喵键盘 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.c-logo {
  height: 10em;
}
</style>
