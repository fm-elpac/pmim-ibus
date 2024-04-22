<script setup>
import c页面 from "@/c/页面.vue";
</script>

<template>
  <c页面 class="v-安装指导">
    <p><b>请注意, 本输入法需要合适的配置才能正常运行 !</b></p>
    <p>具体请见 <code>https://github.com/fm-elpac/pmim-ibus/blob/main/doc/安装.md</code> 页面.</p>

    <p>TODO</p>

    <h3>重启输入法</h3>
    <p>重启本输入法的方法 (适用于 GNU/Linux, GNOME 桌面环境) 是, 执行命令:</p>
    <pre>
flatpak kill io.github.fm_elpac.pmim_ibus

systemctl --user restart org.freedesktop.IBus.session.GNOME</pre>

    <hr />
    <p>适用于 Android 手机:</p>
    <div>
      <img src="@/assets/app-stop-1.jpg" />
    </div>
    <p>不同手机系统的具体操作可能不同, 此处以 MIUI 举栗.</p>
    <p>如图, 在 <strong>应用信息</strong> 界面,
      点击 <strong>结束运行</strong> 按钮, 强行杀死应用.</p>
  </c页面>
</template>

<style scoped>
</style>
