<script setup>
import { ref, computed, onMounted } from "vue";
import { pm_conf_get, pm_conf_set } from "@/api/da/mod.js";
import { 双拼方案列表 } from "@/数据/双拼方案/mod.js";
import { 键盘布局列表 } from "@/数据/键盘布局/mod.js";
import c页面 from "@/c/页面.vue";
import c文本区域 from "@/c/文本区域.vue";
import c双拼键盘 from "@/c/双拼键盘/双拼键盘.vue";

const 配置 = ref({
  "ui.2p_id": null,
  "ui.2pb.user": null,
  "ui.kbl_id": null,
  "ui.kbl.user": null,
});

const 双拼方案id = ref("2p_zirjma");
const 键盘布局id = ref("qwerty");

const 自定义双拼表 = ref("");

async function 加载配置() {
  const r = await pm_conf_get([
    "ui.2p_id",
    "ui.2pb.user",
    "ui.kbl_id",
    "ui.kbl.user",
  ]);

  配置.value = Object.assign({}, 配置.value, r);
  // 更新显示配置
  const p2_id = 配置.value["ui.2p_id"];
  if (null != p2_id) {
    双拼方案id.value = p2_id;
  }
  const pb_user = 配置.value["ui.2pb.user"];
  if (null != pb_user) {
    自定义双拼表.value = JSON.stringify(pb_user, "", "  ");
  } else {
    const 示例 = 双拼方案列表.find((x) => x.id == "2p_zirjma").双拼表;
    自定义双拼表.value = JSON.stringify(示例, "", "  ");
  }
}

const 正在保存 = ref(false);
const 保存成功 = ref(false);
// "": 错误信息
const 保存失败 = ref(null);

async function 保存配置() {
  正在保存.value = true;
  保存成功.value = false;
  保存失败.value = null;

  try {
    // TODO

    保存成功.value = true;
  } catch (e) {
    console.log(e);

    保存失败.value = "" + e;
  }

  正在保存.value = false;
}

onMounted(async () => {
  await 加载配置();
});

const 显示双拼列表 = computed(() => {
  return [].concat(双拼方案列表.map((i) => ({
    title: i.名称,
    value: i.id,
  }))).concat([
    {
      title: "自定义",
      value: "2p_user",
    }
  ]);
});

const 显示键盘布局列表 = computed(() => {
  return 键盘布局列表.map((i) => ({
    title: i.名称,
    value: i.id,
  }));
});

const 显示键盘布局 = computed(() => {
  const 布局 = 键盘布局列表.find((x) => x.id == 键盘布局id.value);
  if (null != 布局) {
    return 布局.PC;
  } else {
    return {
      偏移: [0, 0, 0],
      键位: [[], [], []],
    };
  }
});

const 显示双拼键位 = computed(() => {
  const 方案 = 双拼方案列表.find((x) => x.id == 双拼方案id.value);
  if (null != 方案) {
    return 方案.双拼键位;
  } else {
    return {
      声母: {},
      韵母: {},
    };
  }
});
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

    TODO
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
</style>
