<script setup>
// pmim-uis-nc-im1: PC 候选框窗口
import { ref } from "vue";
//import { fixVuetify } from "../util/fixVuetify.js";
//fixVuetify();
import c候选框 from "./候选框/候选框.vue";

// TODO
const 页码 = ref(0);
const 总页数 = ref(0);
const 拼音上 = ref("");
const 拼音下 = ref("");
const 候选 = ref([]);
</script>

<template>
  <div class="pmim-uis-nc-im1">
    <c候选框
      :页码="页码"
      :总页数="总页数"
      :拼音上="拼音上"
      :拼音下="拼音下"
      :候选="候选"
    />
  </div>
</template>

<style scoped>
</style>
