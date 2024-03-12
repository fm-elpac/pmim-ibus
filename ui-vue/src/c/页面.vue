<script setup>
</script>

<template>
  <div class="c-页面">
    <slot />
  </div>
</template>

<style scoped>
.c-页面 {
  margin: 0.8em;
}

.c-页面 :deep(h2) {
  margin-bottom: 0.2em;
}

.c-页面 :deep(p) {
  margin-bottom: 0.6em;
}

.c-页面 :deep(code) {
  background-color: white;
  word-break: break-word;
}

.c-页面 :deep(h3) {
  margin-top: 1em;
  margin-bottom: 0.4em;
}

.c-页面 :deep(pre) {
  padding: 0.6em;
  font-size: 0.8em;
  background-color: rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.c-页面 :deep(ul) {
  padding-left: 1.2em;
}
</style>
