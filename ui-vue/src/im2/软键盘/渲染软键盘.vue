<script setup>
// 渲染软键盘: 负责提供数据, 渲染软键盘界面
import { onMounted, ref } from "vue";
import { 加载双拼方案和键盘布局 } from "@/插件/mod.js";
import { use输入 } from "./hook.js";
import c皮肤 from "@/c/皮肤.js";

const {
  拼音,
  键盘,
  符号列表,
  扩展列表,
  拼音上,
  拼音下,
  候选,
  设键盘,
  关闭键盘,
  按键点击,
  输入,
} = use输入();

const 已加载 = ref(false);

const 双拼方案 = ref({});
const 键盘布局 = ref({});

onMounted(async () => {
  const [布局, 双拼] = await 加载双拼方案和键盘布局();
  双拼方案.value = 双拼;
  键盘布局.value = 布局;

  已加载.value = true;
});

function 设键盘1(e) {
  设键盘(e.detail[0]);
}

async function 按键点击1(e) {
  await 按键点击(e.detail[0], e.detail[1]);
}

async function 输入1(e) {
  await 输入(e.detail[0]);
}
</script>

<template>
  <c皮肤
    v-if="已加载"
    能力="im2"
    :双拼方案="双拼方案"
    :键盘布局="键盘布局"
    :拼音="拼音"
    :键盘="键盘"
    :符号列表="符号列表"
    :扩展列表="扩展列表"
    :拼音上="拼音上"
    :拼音下="拼音下"
    :候选="候选"
    @设键盘="设键盘1"
    @关闭键盘="关闭键盘"
    @按键点击="按键点击1"
    @输入="输入1"
  />
</template>

<style scoped>
</style>
