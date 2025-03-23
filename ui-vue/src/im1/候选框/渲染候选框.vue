<script setup>
// 渲染候选框: 负责提供数据, 渲染显示候选框界面
import { computed } from "vue";
import { use输入 } from "./hook.js";
import c皮肤 from "@/c/皮肤.js";

const 显示 = use输入();

const 页码 = computed(() => 显示.页码.value);
const 总页数 = computed(() => 显示.总页数.value);
const 拼音上 = computed(() => 显示.拼音上.value);
const 拼音下 = computed(() => 显示.拼音下.value);
const 候选 = computed(() => 显示.候选.value);
</script>

<template>
  <c皮�
    能力="im1"
    :页码="页码"
    :总页数="总页数"
    :拼音上="拼音上"
    :拼音下="拼音下"
    :候选="候选"
  />
</template>

<style scoped>
</style>
