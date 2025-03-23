<script setup>
// pmim-uis-nc-im2: 手机软键盘界面
import { onMounted } from "vue";
import { fixVuetify } from "../util/fixVuetify.js";
// 首先执行修复
fixVuetify();

import c软键盘 from "./软键盘/软键盘.vue";

const p = defineProps({
  "data-ce": String,

  双拼方案: Object,
  键盘布局: Object,
  拼音: Boolean,
  键盘: String,
  符号列表: Array,
  扩展列表: Array,
  拼音上: String,
  拼音下: Array,
  候选: Array,
});

const emit = defineEmits(["加载", "设键盘", "关闭键盘", "按键点击", "输入"]);

onMounted(() => emit("加载"));

function 设键盘(v) {
  emit("设键盘", v);
}

function 关闭键盘() {
  emit("关闭键盘");
}

function 按键点击(c, t) {
  emit("按键点击", c, t);
}

function 输入(n) {
  emit("输入", n);
}
</script>

<template>
  <c软键�
    class="pmim-uis-nc-im2"
    :双拼方案="p.双拼方案"
    :键盘布局="p.键盘布局"
    :拼音="p.拼音"
    :键盘="p.键盘"
    :符号列表="p.符号列表"
    :扩展列表="p.扩展列表"
    :拼音上="p.拼音上"
    :拼音下="p.拼音下"
    :候选="p.候选"
    @设键盘="设键盘"
    @关闭键盘="关闭键盘"
    @按键点击="按键点击"
    @输入="输入"
  />
</template>

<style scoped>
</style>
