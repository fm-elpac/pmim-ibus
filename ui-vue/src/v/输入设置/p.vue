<script setup>
import { use输入设置 } from "./hook.js";
import c页面 from "@/c/页面.vue";
import c文本区域 from "@/c/文本区域.vue";
import c双拼键盘 from "@/c/双拼键盘/双拼键盘.vue";

const {
  双拼方案id,
  键盘布局id,
  自定义双拼表,

  显示双拼列表,
  显示键盘布局,
  显示双拼键位,
  显示键盘布局列表,

  正在保存,
  保存成功,
  保存失败,

  保存配置,
} = use输入设置();
</script>

<template>
  <c页面 class="v-输入设置">
    <div class="双拼方案">
      <p>
        <v-select
          label="双拼方案"
          variant="solo"
          v-model="双拼方案id"
          :items="显示双拼列表"
        />
      </p>

      <div v-if="双拼方案id != '2p_user'" class="双拼键盘">
        <c双拼键盘
          :键盘布局="显示键盘布局"
          :双拼键位="显示双拼键位"
        />
      </div>

      <p v-if="双拼方案id != '2p_user'">
        <v-select
          label="键盘布局 (仅供显示)"
          variant="solo"
          v-model="键盘布局id"
          :items="显示键盘布局列表"
        />
      </p>
      <p v-else class="自定义双拼表">自定义双拼表:
        <c文本区域 v-model="自定义双拼表" />
      </p>
    </div>

    <div class="保存按钮">
      <v-alert v-if="正在保存" type="info" title="正在保存配置并重启核心 .. . " />
      <v-alert v-if="保存成功" type="success" title="保存成功" closable />
      <v-alert v-if="null != 保存失败" type="error" title="错误" :text="保存失败" closable />

      <v-btn
        block
        size="x-large"
        color="primary"
        :disabled="正在保存"
        @click="保存配置"
      >
        <span>保存设置</span>

        <template #append v-if="正在保存">
          <v-progress-circular indeterminate />
        </template>
      </v-btn>
    </div>
  </c页面>
</template>

<style scoped>
.双拼键盘 {
  overflow-x: auto;
  margin-bottom: 0.6em;
}

.c-双拼键盘 {
  min-width: 580px;
}

.保存按钮 .v-alert {
  margin-bottom: 1em;
}
</style>
