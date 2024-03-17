# pmim-ibus

<https://github.com/fm-elpac/pmim-ibus>

胖喵输入法: GNU/Linux 应用 (ibus)

A Chinese pinyin input method for ibus.

![CI](https://github.com/fm-elpac/pmim-ibus/actions/workflows/ci.yml/badge.svg)

镜像:

- <https://bitbucket.org/fm-elpac/pmim-ibus/>
- <https://codeberg.org/fm-elpac/pmim-ibus>
- <https://notabug.org/fm-elpac/pmim-ibus>
- <https://gitlab.com/fm-elpac/pmim-ibus>

---

本输入法是跨平台的, 这是 GNU/Linux 平台 (ibus) 的版本.

- 项目主页 (拼音核心): <https://github.com/fm-elpac/pmim>

- Android 版本: <https://github.com/fm-elpac/pmim-apk>

- ibus 接口模块: <https://github.com/fm-elpac/librush>

## 安装说明

- 从 [`flatpak`](https://flatpak.org/setup/) 安装应用:

  ```sh
  > flatpak install flathub io.github.fm_elpac.pmim_ibus
  ```

  推荐使用国内 flathub 镜像: <https://mirror.sjtu.edu.cn/docs/flathub>

- 更新到最新版本:

  ```sh
  > flatpak update
  ```

- 安装后的配置请见: [doc/安装.md](./doc/安装.md)

  **请注意, 本输入法需要合适的配置才能正常运行 !**

- 本地开发运行请见: [doc/开发调试.md](./doc/开发调试.md)

## 相关文章

- 《使用 electronjs 实现 ibus 输入法的用户界面》
  - <https://www.bilibili.com/read/cv31909625/>
  - <https://zhuanlan.zhihu.com/p/682574530>
  - <https://juejin.cn/post/7343902139821867044>
  - <https://blog.csdn.net/secext2022/article/details/136143845>

- 《发布 flatpak 应用 (flathub)》
  - <https://www.bilibili.com/read/cv33088822/>
  - <https://zhuanlan.zhihu.com/p/685744007>
  - <https://juejin.cn/post/7343905368622645284>
  - <https://blog.csdn.net/secext2022/article/details/136526447>

- 《发布 AUR 软件包 (ArchLinux)》
  - <https://www.bilibili.com/read/cv33089622/>
  - <https://zhuanlan.zhihu.com/p/686059329>
  - <https://juejin.cn/post/7344245471349096460>

- 《多种双拼方案的实现》
  - <https://www.bilibili.com/read/cv33242158/>
  - <https://zhuanlan.zhihu.com/p/687090245>
  - <https://juejin.cn/post/7346102009491439654>

## LICENSE

GNU General Public License v3.0 or later (SPDX Identifier: `GPL-3.0-or-later`)

<https://spdx.org/licenses/GPL-3.0-or-later.html>
