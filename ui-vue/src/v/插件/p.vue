<script setup>
import { computed, ref, onMounted } from "vue";
import { 加载插件列表_启用 } from "@/插件/mod.js";
import { 插件排序 } from "./util.js";
import c页面 from "@/c/页面.vue";
import c插件 from "./插件.vue";

const 插件列表 = ref([]);

onMounted(async () => {
  const a = await 加载插件列表_启用();
  a.sort(插件排序);
  插件列表.value = a;
});

const 个数 = computed(() => 插件列表.value.length);
</script>

<template>
  <c页面 class="v-插件">
    <v-alert
      type="warning"
      title="警告"
      text="目前对插件并没有足够的安全机制 (权限限制), 所以请不要使用恶意插件 !"
      closable
    />

    <c插件
      v-for="i in 插件列表"
      :插件项="i"
    />

    <p class="text-medium-emphasis">共有 {{ 个数 }} 个插件.</p>
  </c页面>
</template>

<style scoped>
p {
  margin: 1em 0;
}
</style>
