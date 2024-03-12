<script setup>
import { ref, onMounted } from "vue";
import { pm_db } from "@/api/da/mod.js";
import c页面 from "@/c/页面.vue";

const ds文件路径 = ref("");
const ds格式版本 = ref("");
const ds创建时间 = ref("");
const ds名称 = ref("");

const du文件路径 = ref("");
const du格式版本 = ref("");
const du创建时间 = ref("");
const du_ulid = ref("");

onMounted(async () => {
  const r = await pm_db();
  ds文件路径.value = r.内置数据库文件;
  du文件路径.value = r.用户数据库文件;

  du格式版本.value = r.du.version;
  du创建时间.value = r.du.v._last_update;
  du_ulid.value = r.du.u_ulid;

  ds格式版本.value = r.ds.version;
  ds创建时间.value = r.ds.v._last_update;
  ds名称.value = r.ds.v.n;
});
</script>

<template>
  <c页面 class="v-数据库">
    <p>数据库相关信息如下:</p>
    <h3>内置数据库</h3>
    <p>文件路径: <code>{{ ds文件路径 }}</code></p>
    <p>名称: <code>{{ ds名称 }}</code></p>
    <p>创建时间: <code>{{ ds创建时间 }}</code></p>
    <p>格式版本: <code>{{ ds格式版本 }}</code></p>

    <h3>用户数据库</h3>
    <p>文件路径: <code>{{ du文件路径 }}</code></p>
    <p>ULID: <code>{{ du_ulid }}</code></p>
    <p>创建时间: <code>{{ du创建时间 }}</code></p>
    <p>格式版本: <code>{{ du格式版本 }}</code></p>
  </c页面>
</template>

<style scoped>
</style>
