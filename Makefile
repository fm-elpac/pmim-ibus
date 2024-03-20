# pmim-ibus/Makefile

# 完整的编译过程
.PHONY: build
build: install_patch build_ui build_lo build_uis_nc

# npm install 并且修改依赖的代码
.PHONY: install_patch
install_patch: install_patch_ui install_patch_uis_nc

.PHONY: install_patch_ui
install_patch_ui:
	cd ui-vue && npm install
	cd ui-vue/node_modules/@mdi/font/css && patch -p2 < ../../../../../uis/patch/1.patch
	deno run -A uis/patch/fix_font_name.js ui-vue/node_modules/@mdi/font/css/materialdesignicons.css pmim-ui

.PHONY: install_patch_uis_nc
install_patch_uis_nc:
	cd uis/pmim-uis-nc && npm install
	cd uis/pmim-uis-nc/node_modules/@mdi/font/css && patch -p2 < ../../../../../patch/2.patch
	deno run -A uis/patch/fix_font_name.js uis/pmim-uis-nc/node_modules/@mdi/font/css/materialdesignicons.css pmim-uis-nc

.PHONY: install_patch_uis_bl
install_patch_uis_bl:
	cd uis/pmim-uis-bl && npm install
	cd uis/pmim-uis-bl/node_modules/@mdi/font/css && patch -p2 < ../../../../../patch/2.patch
	deno run -A uis/patch/fix_font_name.js uis/pmim-uis-bl/node_modules/@mdi/font/css/materialdesignicons.css pmim-uis-bl

.PHONY: build_ui
build_ui:
	cd ui-vue && npm run build

.PHONY: build_lo
build_lo:
	cd ui-vue/dist && ln -s assets/lo1-*.js lo1.js
	cd ui-vue && npx webpack
	rm ui-vue/dist/lo1.js
	cd ui-vue && deno run --allow-read lo/fix.js dist/lo1/index.html > dist/lo/index.html

.PHONY: build_uis_nc
build_uis_nc:
	cd uis/pmim-uis-nc && npm run build
	cp uis/pmim-uis-nc/node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2 uis/pmim-uis-nc/dist
	deno run -A uis/patch/fix_css_font.js uis/pmim-uis-nc/dist/style.css

.PHONY: build_uis_bl
build_uis_bl:
	cd uis/pmim-uis-bl && npm run build
	cp uis/pmim-uis-bl/node_modules/@mdi/font/fonts/materialdesignicons-webfont.woff2 uis/pmim-uis-bl/dist
	deno run -A uis/patch/fix_css_font.js uis/pmim-uis-bl/dist/style.css

# 复制插件文件
.PHONY: plugin
plugin:
	mkdir -p plugin/pmim-uis-nc/static && cp -r uis/pmim-uis-nc/dist/* plugin/pmim-uis-nc/static

# TODO
# mkdir -p plugin/pmim-uis-bl/static && cp -r uis/pmim-uis-bl/dist/* plugin/pmim-uis-bl/static

# TODO
