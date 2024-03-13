<script setup>
import { ref, computed, onMounted } from "vue";
import { pm_conf_get, pm_conf_set, pm_ci } from "@/api/da/mod.js";
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
    // 保存 ui 配置
    const c1 = 配置.value;
    c1["ui.2p_id"] = 双拼方案id.value;
    // 用户自定义双拼方案
    if ("2p_user" == 双拼方案id.value) {
      // 检查双拼表
      const 原始 = 自定义双拼表.value;
      let 数据 = {};
      try {
        数据 = JSON.parse(原始);
      } catch (e) {
        const 错误信息 = "JSON 格式错误: " + e;
        throw 错误信息;
      }

      c1["ui.2pb.user"] = 数据;
    }
    c1["ui.kbl_id"] = 键盘布局id.value;
    // TODO ui.kbl.user

    await pm_conf_set(c1);

    // 保存核心配置
    const c2 = {
      "c.2pb": "2p_zirjma",
      "c.2pb.user": {},
    };
    if ("2p_zirjma" != 双拼方案id.value) {
      if ("2p_user" != 双拼方案id.value) {
        // 内置方案
        const 双拼表 = 双拼方案列表.find((x) => x.id == 双拼方案id.value).双拼表;
        c2["c.2pb.user"] = 双拼表;
      } else {
        // 用户自定义双拼方案
        c2["c.2pb.user"] = c1["ui.2pb.user"];
      }
    }
    await pm_conf_set(c2);

    // 重启核心
    await pm_ci();

    // 重新加载配置
    await 加载配置();

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
