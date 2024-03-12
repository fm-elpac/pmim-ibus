<script setup>
import { onMounted } from "vue";
import { 设置缩放 } from "@/api/ea/mod.js";

onMounted(async () => {
  await 设置缩放(2, 1.0);
});

// TODO
</script>

<template>
  <v-app class="ui-app">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Application Bar</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer />

    <RouterView />
  </v-app>
</template>

<style scoped>
</style>
