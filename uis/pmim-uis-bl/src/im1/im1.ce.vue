<script setup>
// pmim-uis-nc-im1: PC 候选框窗口
import { onMounted } from "vue";
import c候选框 from "./候选框/候选框.vue";

const p = defineProps({
  "data-ce": String,

  页码: Number,
  总页数: Number,
  拼音上: String,
  拼音下: Array,
  候选: Array,
});

const emit = defineEmits(["加载"]);

onMounted(() => emit("加载"));
</script>

<template>
  <c候选�
    class="pmim-uis-nc-im1"
    :页码="p.页码"
    :总页数="p.总页数"
    :拼音上="p.拼音上"
    :拼音下="p.拼音下"
    :候选="p.候选"
  />
</template>

<style scoped>
</style>
