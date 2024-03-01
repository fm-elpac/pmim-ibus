// android (webview) api: PmimService/ImView
const aa = window.pmim_a;

export function aa可用() {
  return null != window.pmim_a;
}

// 输入: 提交文本
export function aa_提交(t) {
  return aa.im_提交(t);
}

// 关闭软键盘
export function aa_隐藏键盘() {
  aa.im_隐藏键盘();
}

// 发送编辑器默认动作
export function aa_发送默认(来自回车键) {
  aa.im_发送默认(来自回车键);
}

// 发送字符
export function aa_发送键字符(c) {
  aa.im_发送键字符(c);
}

// 获取选择的文本 (复制)
export function aa_取选择的文本() {
  return aa.im_取选择的文本();
}

// 设置选择范围
export function aa_设选择(开始, 结束) {
  aa.im_设选择(开始, 结束);
}

// 设置软键盘高度 (dp)
export function aa_设置高度dp(高) {
  aa.im_设置高度dp(高);
}

// 发送键按下
export function aa_发送键按下(键码, meta = 0) {
  aa.im_发送键按下(键码, meta);
}

// 发送键释放
export function aa_发送键释放(键码, meta = 0) {
  aa.im_发送键释放(键码, meta);
}

// 发送按下并松开一个键
export function aa_发送键点击(键码, meta = 0) {
  aa.im_发送键点击(键码, meta);
}

// 发送退格键 (backspace)
export function aa_发送键_退格() {
  aa.im_发送键_退格();
}

// 发送删除键 (编辑键区 delete)
export function aa_发送键_删除() {
  aa.im_发送键_删除();
}

// 发送 home 键 (编辑键区)
export function aa_发送键_home() {
  aa.im_发送键_home();
}

// 发送 end 键 (编辑键区)
export function aa_发送键_end() {
  aa.im_发送键_end();
}

// 发送 pageup 键 (编辑键区)
export function aa_发送键_上页() {
  aa.im_发送键_上页();
}

// 发送 pagedown 键 (编辑键区)
export function aa_发送键_下页() {
  aa.im_发送键_下页();
}

// 发送回车键 (enter)
export function aa_发送键_回车() {
  aa.im_发送键_回车();
}

// 方向键: 上
export function aa_发送键_上() {
  aa.im_发送键_上();
}

// 方向键: 下
export function aa_发送键_下() {
  aa.im_发送键_下();
}

// 方向键: 左
export function aa_发送键_左() {
  aa.im_发送键_左();
}

// 方向键: 右
export function aa_发送键_右() {
  aa.im_发送键_右();
}

// 全选
export function aa_全选() {
  aa.im_全选();
}

// 撤销
export function aa_撤销() {
  aa.im_撤销();
}

// 重做
export function aa_重做() {
  aa.im_重做();
}

// 获取剪切板文本
export function aa_剪切板取文本() {
  return aa.im_剪切板取文本();
}

// 设置剪切板文本
export function aa_剪切板设文本(t) {
  aa.im_剪切板设文本(t);
}

// 清空剪切板
export function aa_剪切板清空() {
  aa.im_剪切板清空();
}

// 获取 pmim-server 的 HTTP 端口号
export function aa_端口() {
  return aa.pm_端口();
}

// 读取 pmim-server 的口令
export function aa_口令() {
  return aa.pm_口令();
}

// 日志输出 (调试)
export function aa_log(t) {
  aa.log(t);
}

// 加载 URL (重定向)
export function aa_加载(u) {
  aa.加载(u);
}
