<script setup>
// pmim-uis-nc-im2: 手机软键盘界面
import { ref } from "vue";
import { fixVuetify } from "../util/fixVuetify.js";
// 首先执行修复
fixVuetify();

import c软键盘 from "./软键盘/软键盘.vue";

// TODO
const 拼音 = ref(false);
const 键盘 = ref("A");
const 符号列表 = ref([]);
const 扩展列表 = ref([]);
const 拼音上 = ref("");
const 拼音下 = ref([]);
const 候选 = ref([]);

function 设键盘() {
  // TODO
}

function 关闭键盘() {
  // TODO
}

function 按键点击() {
  // TODO
}

function 输入() {
  // TODO
}
</script>

<template>
  <div class="pmim-uis-nc-im2">
    <c软键盘
      :拼音="拼音"
      :键盘="键盘"
      :符号列表="符号列表"
      :扩展列表="扩展列表"
      :拼音上="拼音上"
      :拼音下="拼音下"
      :候选="候选"
      @设键盘="设键盘"
      @关闭键盘="关闭键盘"
      @按键点击="按键点击"
      @输入="输入"
    />
  </div>
</template>

<style scoped>
</style>
