<script setup>
import { ref, computed, onMounted } from "vue";
import { 发送页面刷新 } from "@/api/da/mod.js";
import { 加载皮肤列表, 加载皮肤配置, 设置皮肤 } from "@/皮肤/mod.js";
import { 初始化灰度模式, 灰度模式_读取配置, 灰度模式_写入配置 } from "@/util/nc.js";
import c页面 from "@/c/页面.vue";

// 加载的皮肤列表
const 皮肤列表 = ref([]);
const 当前皮肤 = ref("pmim-uis-nc");

async function 加载() {
  皮肤列表.value = await 加载皮肤列表();
  const c = await 加载皮肤配置();
  if (null != c) {
    当前皮肤.value = c;
  }
}

// 灰度模式
const 灰度模式 = ref(false);

onMounted(async () => {
  await 加载();

  灰度模式.value = await 灰度模式_读取配置();
});

const 正在保存 = ref(false);

async function 保存设置() {
  正在保存.value = true;

  await 设置皮肤(当前皮肤.value);
  await 灰度模式_写入配置(灰度模式.value);

  await 发送页面刷新();
  await 初始化灰度模式();

  正在保存.value = false;
}

const 显示列表 = computed(() => 皮肤列表.value.map(i => ({
  title: i.描述.插件信息.名称,
  value: i.id,
})));
</script>

<template>
  <c页面 class="v-个性化">
    <div class="选择皮肤">
      <p>
        <v-select
          label="皮肤"
          variant="solo"
          v-model="当前皮肤"
          :items="显示列表"
        />
      </p>
    </div>

    <div class="灰度模式">
      <p>
        <v-card title="灰度模式" subtitle="禁用彩色.">
          <template #append>
            <v-switch v-model="灰度模式" color="primary" />
          </template>
        </v-card>
      </p>
    </div>

    <div class="保存按钮">
      <v-btn
        block
        size="x-large"
        color="primary"
        :disabled="正在保存"
        @click="保存设置"
      >
        <span>保存设置</span>
      </v-btn>
    </div>
  </c页面>
</template>

<style scoped>
.保存按钮 {
  margin-top: 2em;
}
</style>
