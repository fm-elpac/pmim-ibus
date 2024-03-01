<script setup>
import { ref, provide } from "vue";
import { 布局 } from "./键盘布局.js";
import c键盘框架 from "./键盘框架.vue";
import c键盘行 from "./键盘行.vue";
import c按键0 from "./按键/按键0.vue";
import c退格键 from "./按键/退格键.vue";
import c回车键 from "./按键/回车键.vue";
import c上挡键 from "./按键/上挡键.vue";
import c清除键 from "./按键/清除键.vue";
import c空格键 from "./按键/空格键.vue";

const p = defineProps({
  英文: Boolean,
});

// shift 状态
const shift = ref(false);

function 按shift() {
  shift.value = !shift.value;
}

provide("shift", shift);
provide("按shift", 按shift);
</script>

<template>
  <c键盘框架 class="c-主键盘">
    <c键盘行>
      <c上挡键 class="w15" v-if="p.英文" />
      <c清除键 class="w15" v-else />

      <c按键0
        v-for="i in 布局[0]"
        class="w10"
        类型="t"
        :文本="i[0]"
        :文本2="i[1]"
      />
      <c退格键 class="w15" />
    </c键盘行>
    <c键盘行>
      <c按键0
        v-for="i in 布局[1]"
        class="w10"
        类型="t"
        :文本="i[0]"
        :文本2="i[1]"
      />
    </c键盘行>
    <c键盘行>
      <c按键0
        v-for="i in 布局[2]"
        class="w10"
        类型="t"
        :文本="i[0]"
        :文本2="i[1]"
      />
    </c键盘行>
    <c键盘行>
      <c按键0
        class="w10"
        类型="t"
        :文本="布局[3][0][0]"
        :文本2="布局[3][0][1]"
      />
      <c按键0
        class="w10"
        类型="t"
        :文本="布局[3][1][0]"
        :文本2="布局[3][1][1]"
      />
      <c空格键 class="w60" />

      <div class="w05 占位符" />
      <c回车键 class="w15" />
    </c键盘行>
  </c键盘框架>
</template>

<style scoped>
.w15 {
  flex-grow: 1.5;
}

.w10 {
  flex-grow: 1;
}

.w05 {
  flex-grow: 0.5;
}

.w40 {
  flex-grow: 4;
}

.w60 {
  flex-grow: 6;
}
</style>
