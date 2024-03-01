<script setup>
import { inject } from "vue";
import c候选项 from "./候选项.vue";

const 拼音 = inject("拼音下", "");
const 候选 = inject("候选", []);
</script>

<template>
  <div class="c-顶栏拼音">
    <div class="拼音">
      <span>{{ 拼音 }}</span>
    </div>

    <div class="候选">
      <c候选项
        v-for="(i, j) in 候选"
        :文本="i"
        :序号="j"
      />
    </div>
  </div>
</template>

<style scoped>
.c-顶栏拼音 {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.拼音 {
  flex-shrink: 0;
  overflow: hidden;
  padding: 0.2em 0;
}

.拼音 span {
  font-size: 0.8em;
  line-height: 1em;
  display: block;
}

.候选 {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: hidden;
  overflow-x: auto;

  display: flex;
  align-items: center;
}
</style>
