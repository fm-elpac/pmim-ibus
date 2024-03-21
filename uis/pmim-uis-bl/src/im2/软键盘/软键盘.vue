<script setup>
// 软键盘: 静态显示的组件
import { provide, computed } from "vue";
import c顶栏 from "../c/顶栏/顶栏.vue";
import c键盘 from "../c/键盘/键盘.vue";

const p = defineProps({
  双拼方案: Object,
  键盘布局: Object,
  // 是否处于 拼音模式
  拼音: Boolean,
  // 当前显示的键盘
  键盘: String,
  // 符号键盘的内容 (32 个)
  符号列表: Array,
  // 扩展键盘显示的内容
  扩展列表: Array,
  // 全拼
  拼音上: String,
  // 输入的拼音
  拼音下: Array,
  // 候选项
  候选: Array,
});

const emit = defineEmits(["设键盘", "关闭键盘", "按键点击", "输入"]);

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

const 双拼方案 = computed(() => p.双拼方案);
const 键盘布局 = computed(() => p.键盘布局);
const 符号列表 = computed(() => p.符号列表);
const 扩展列表 = computed(() => p.扩展列表);
const 拼音上 = computed(() => p.拼音上);
const 拼音下 = computed(() => p.拼音下);
const 候选 = computed(() => p.候选);

provide("双拼方案", 双拼方案);
provide("键盘布局", 键盘布局);
provide("符号列表", 符号列表);
provide("扩展列表", 扩展列表);
provide("拼音上", 拼音上);
provide("拼音下", 拼音下);
provide("候选", 候选);
provide("设键盘", 设键盘);
provide("关闭键盘", 关闭键盘);
provide("按键点击", 按键点击);
provide("输入", 输入);
</script>

<template>
  <div class="c-软键盘">
    <c顶栏 :键盘="p.键盘" :拼音="p.拼音" />
    <c键盘 :键盘="p.键盘" />
  </div>
</template>

<style scoped>
.c-软键盘 {
  width: 100%;
  height: 100%;

  background-color: var(--pmim-blc-b0);
  color: var(--pmim-blc-w1);

  box-sizing: border-box;
  overflow: hidden;

  border-top: solid 8px var(--pmim-blc-b10);
  font-size: 24px;

  padding: 0 0.6em;

  display: flex;
  flex-direction: column;

  position: relative;
  top: 0;
  left: 0;
}

.c-软键盘::before {
  content: " ";
  display: block;
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: var(--pmim-blc-b10);
  box-shadow: 0 0 16px rgba(var(--pmim-blc-p2-rgb), 0.8);
}
</style>
