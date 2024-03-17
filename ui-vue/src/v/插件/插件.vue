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
</script>

<template>
  <div class="c-插件">
    <v-card :title="名称">
      <v-card-text>
        <p>
          <v-chip
            v-if="内置"
            class="r"
            color="blue"
            variant="flat"
            size="small"
          >内置</v-chip>
          <span>{{ 描述 }}</span>
        </p>
        <p class="text-medium-emphasis"><span>URL: </span><span>{{ 描述URL }}</span></p>
        <p>
          <span class="s r">版本:</span>
          <v-chip size="small">{{ 版本 }}</v-chip>
          <span class="s l">
            <span>路径:</span> <code>{{ 路径 }}</code>
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

.r {
  margin-right: 0.4em;
}

.l {
  margin-left: 1em;
}
</style>
