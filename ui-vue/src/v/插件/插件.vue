<script setup>
import { computed } from "vue";

const p = defineProps({
  插件项: Object,
});

const 名称 = computed(() => p.插件项.描述.插件信息.名称);
const 描述 = computed(() => p.插件项.描述.插件信息.描述);
const 描述URL = computed(() => p.插件项.描述.插件信息.URL);
const 版本 = computed(() => p.插件项.描述.插件信息.版本);
const 路径 = computed(() => p.插件项.描述文件);
const 内置 = computed(() => 1 == p.插件项.内置);
const 启用 = computed(() => 1 == p.插件项.启用);
</script>

<template>
  <div class="c-插件">
    <v-card>
      <v-card-title>
        <span title="已启用">
          <v-chip
            v-if="启用"
            class="r"
            color="primary"
            variant="outlined"
          >已启用</v-chip>
        </span>
        <span title="名称">{{ 名称 }}</span>
      </v-card-title>
      <v-card-subtitle>
        <span title="描述">{{ 描述 }}</span>
      </v-card-subtitle>
      <v-card-text>
        <p>
          <span title="版本号">
            <v-chip size="small">{{ 版本 }}</v-chip>
          </span>

          <span class="l" title="URL">
            <span class="text-medium-emphasis">{{ 描述URL }}</span>
          </span>
        </p>
        <p class="s">
          <span
            v-if="内置"
            title="内置"
          >
            <v-chip color="blue" variant="flat" size="small">内置</v-chip>
          </span>

          <span class="l" title="路径">
            <code>{{ 路径 }}</code>
          </span>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.c-插件 {
  margin: 1em 0;
}

.c-插件 :deep(.v-card-text) {
  padding-bottom: 0;
}

.s {
  opacity: 0.8;
}

.l {
  margin-left: 0.8em;
}

.r {
  margin-right: 0.8em;
}

.c-插件 :deep(.v-card-title),
.c-插件 :deep(.v-card-subtitle) {
  white-space: normal;
}
</style>
