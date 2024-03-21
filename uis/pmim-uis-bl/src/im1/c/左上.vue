<script setup>
import c拼音 from "./拼音.vue";

const p = defineProps({
  页码: Number,
  总页数: Number,
  拼音上: String,
  拼音下: Array,
});
</script>

<template>
  <div class="c-左上">
    <c拼音
      class="左"
      :上="p.拼音上"
      :下="p.拼音下"
    />
    <div class="右">
      <div class="名称">胖喵拼音</div>
      <div class="翻页">翻页 , . ({{ p.页码 }}/{{ p.总页数 }})</div>
    </div>
  </div>
</template>

<style scoped>
.c-左上 {
  padding: 4px;
  padding-right: 8px;
  background-color: #FF9800;

  display: flex;
}

.左 {
  flex-grow: 1;
  flex-shrink: 1;
}

.右 {
  flex-grow: 0;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  color: white;
}

.名称 {
  font-size: 24px;
}

.翻页 {
  font-size: 16px;
  opacity: 0.8;
}
</style>
