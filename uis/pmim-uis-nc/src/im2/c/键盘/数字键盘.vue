<script setup>
import { 数字布局 } from "./键盘布局.js";
import c键盘框架 from "./键盘框架.vue";
import c键盘行 from "./键盘行.vue";
import c按键0 from "./按键/按键0.vue";
import c退格键 from "./按键/退格键.vue";
import c回车键 from "./按键/回车键.vue";
import c空格键 from "./按键/空格键.vue";
</script>

<template>
  <c键盘框架 class="c-数字键盘">
    <c键盘行>
      <c按键0
        v-for="i in 数字布局[0]"
        class="w1"
        类型="t"
        :文本="i"
      />
      <c退格键 class="w1" />
    </c键盘行>
    <c键盘行>
      <c按键0
        v-for="i in 数字布局[1]"
        class="w1"
        类型="t"
        :文本="i"
      />
    </c键盘行>
    <c键盘行>
      <c按键0
        v-for="i in 数字布局[2]"
        class="w1"
        类型="t"
        :文本="i"
      />
    </c键盘行>
    <c键盘行>
      <c按键0 class="w1" 类型="t" :文本="数字布局[3][0]" />
      <c按键0 class="w1" 类型="t" :文本="数字布局[3][1]" />
      <c按键0 class="w1" 类型="t" :文本="数字布局[3][2]" />

      <c空格键 class="w1" />

      <c按键0 class="w1" 类型="t" :文本="数字布局[3][3]" />

      <c回车键 class="w1" />
    </c键盘行>
  </c键盘框架>
</template>

<style scoped>
.w1 {
  flex-grow: 1;
}
</style>
