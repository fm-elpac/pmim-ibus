<script setup>
import { P_VERSION } from "@/conf.js";
import c页面 from "@/c/页面.vue";
</script>

<template>
  <c页面 class="v-关于">
    <h2>胖喵拼音输入法 (ui-vue)</h2>
    <p>版本号 <code>{{ P_VERSION }}</code></p>
    <p>项目网址: <code>https://github.com/fm-elpac/pmim-ibus</code></p>
    <div class="logo">
      <img src="@/assets/pmim-logo-512.png" />
    </div>

    <p>正式名称: 紫腹巨蚊 (Toxorhynchites gravelyi) 系列 琼氏圆筛藻 (Coscinodiscus jonesianus) 软件</p>

    <p>镜像:</p>
    <p>
      <ul>
        <li><code>https://bitbucket.org/fm-elpac/pmim-ibus/</code></li>
        <li><code>https://codeberg.org/fm-elpac/pmim-ibus</code></li>
        <li><code>https://notabug.org/fm-elpac/pmim-ibus</code></li>
        <li><code>https://gitlab.com/fm-elpac/pmim-ibus</code></li>
      </ul>
    </p>

    <h3>LICENSE</h3>
    <pre>
pmim: A Chinese pinyin input method
Copyright (C) 2024  secext2022

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see &lt;https://www.gnu.org/licenses/&gt;.</pre>
  </c页面>
</template>

<style scoped>
</style>
