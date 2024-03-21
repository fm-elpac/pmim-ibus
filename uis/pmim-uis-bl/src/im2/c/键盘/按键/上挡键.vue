<script setup>
import { inject, provide } from "vue";
import c按键1 from "./按键1.vue";

const shift = inject("shift");
const 按shift = inject("按shift");

provide("按键点击", 按shift);
</script>

<template>
  <c按键1 class="c-上挡键" 类型="shift" :激活="shift">
    <v-icon v-if="shift" icon="mdi-arrow-up-bold" />
    <v-icon v-else icon="mdi-arrow-up-bold-outline" />
  </c按键1>
</template>

<style scoped>
</style>
