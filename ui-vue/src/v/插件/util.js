function 检查插件启用(a, b) {
  const 是启用 = (i) => 1 == i.启用;
  const aa = 是启用(a);
  const bb = 是启用(b);

  if (aa && (!bb)) {
    // a 启用
    return -1;
  } else if ((!aa) && bb) {
    // b 启用
    return 1;
  }
  return 0;
}

function 检查内置插件(a, b) {
  const 是内置 = (i) => 1 == i.内置;
  const aa = 是内置(a);
  const bb = 是内置(b);

  if (aa && (!bb)) {
    // a 内置
    return 1;
  } else if ((!aa) && bb) {
    // b 内置
    return -1;
  }
  return 0;
}

function 检查插件类型(a, b) {
  function 映射类型(i) {
    if (null != i.描述.皮肤) {
      // 皮肤插件
      return 3;
    } else if (null != i.描述.双拼方案) {
      return 2;
    } else if (null != i.描述.键盘布局) {
      return 1;
    }
    return 0;
  }

  const aa = 映射类型(a);
  const bb = 映射类型(b);
  return bb - aa;
}

function 检查插件名称(a, b) {
  const aa = a.描述.插件信息.名称;
  const bb = b.描述.插件信息.名称;
  if (aa > bb) {
    return 1;
  } else if (aa < bb) {
    return -1;
  }
  return 0;
}

export function 插件排序(a, b) {
  // 已启用的插件优先
  let r = 检查插件启用(a, b);
  if (0 != r) {
    return r;
  }

  // 用户插件优先于内置插件
  r = 检查内置插件(a, b);
  if (0 != r) {
    return r;
  }

  // 插件类型排序: 皮肤, 双拼方案, 键盘布局, 其余
  r = 检查插件类型(a, b);
  if (0 != r) {
    return r;
  }

  // 按插件名称排序
  r = 检查插件名称(a, b);
  if (0 != r) {
    return r;
  }

  return 0;
}
