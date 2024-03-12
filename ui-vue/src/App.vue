<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { 设置缩放 } from "@/api/ea/mod.js";

onMounted(async () => {
  await 设置缩放(2, 1.3);
});

const 导航 = ref(false);

const 列表 = [
  {
    名称: "安装指导",
    图标: "mdi-wrench-outline",
    to: "/",
  },
  {
    名称: "输入设置",
    图标: "mdi-keyboard-settings-outline",
    to: "/输入设置",
  },
  {
    名称: "个性化",
    图标: "mdi-palette-outline",
    to: "/个性化",
  },
  {
    名称: "输入测量",
    图标: "mdi-chart-line",
    to: "/输入测量",
  },
  {
    名称: "数据库",
    图标: "mdi-database-outline",
    to: "/数据库",
  },
  {
    名称: "关于",
    图标: "mdi-information-outline",
    to: "/关于",
  },
];

const route = useRoute();
</script>

<template>
  <v-app class="ui-app">
    <v-navigation-drawer
      v-model="导航"
      class="ui-nav"
      temporary
      width="200"
    >
      <v-list-item
        v-for="i in 列表"
        :title="i.名称"
        :prepend-icon="i.图标"
        :to="i.to"
        link
        variant="plain"
        density="comfortable"
      />
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          :active="导航"
          @click.stop="导航 = !导航"
        />
      </template>

      <v-app-bar-title>{{ route.name }}</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.ui-nav :deep(.v-list-item__prepend) > .v-icon ~ .v-list-item__spacer {
  width: 16px;
}

.ui-nav .v-list-item {
  min-height: 56px;
  font-size: 1.2em;
}

.ui-nav :deep(.v-list-item-title) {
  font-size: 1em;
}
</style>
