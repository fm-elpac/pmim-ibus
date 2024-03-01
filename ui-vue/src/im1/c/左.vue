<script setup>
import c左上 from "./左上.vue";
import c候选项 from "./候选项.vue";

const p = defineProps({
  页码: Number,
  总页数: Number,
  拼音上: String,
  拼音下: String,
  候选: Array,
});
</script>

<template>
  <div class="c-左">
    <c左上
      :页码="p.页码"
      :总页数="p.总页数"
      :拼音上="p.拼音上"
      :拼音下="p.拼音下"
    />
    <c候选项 :候选="p.候选" />
  </div>
</template>

<style scoped>
.c-左 {
  display: flex;
  flex-direction: column;
}
</style>
