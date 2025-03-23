<script setup>
const p = defineProps({
  激活: Boolean,
});

const emit = defineEmits(["点击"]);

function 点击() {
  emit("点击");
}
</script>

<template>
  <div
    class="c-顶栏按钮"
    :class='{ "激活": p.激活, "text-medium-emphasis": !p.激活 }'
    @click="点击"
  >
    <slot />
  </div>
</template>

<style scoped>
.c-顶栏按钮 {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.4em;

  cursor: pointer;
}

.c-顶栏按钮:hover,
.激活 {
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
}
</style>
