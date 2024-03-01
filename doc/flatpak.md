# flatpak

在本地编译 flatpak 应用.

- (1) 安装 flatpak: <https://flatpak.org/>

- (2) 安装 flatpak-builder:

  ```
  > flatpak install flathub org.flatpak.Builder
  ```

  验证安装:

  ```
  > flatpak run org.flatpak.Builder --version
  flatpak-builder 1.4.1
  ```

- (3) 安装 electronjs:

  ```sh
  > cd flatpak
  > env ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" npm install electron
  ```

- (4) 编译应用:

  ```
  > cd flatpak
  > flatpak run org.flatpak.Builder build io.github.fm_elpac.pmim_ibus.yml
  ```

- (5) 安装并运行:

  ```
  > cd flatpak
  > flatpak run org.flatpak.Builder --user --install --force-clean build io.github.fm_elpac.pmim_ibus.yml
  > flatpak run io.github.fm_elpac.pmim_ibus
  ```

TODO
