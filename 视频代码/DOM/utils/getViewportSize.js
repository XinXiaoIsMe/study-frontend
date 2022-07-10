export function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  // 兼容IE8
  if (document.compatMode === 'CSS1Compat') {
    // 标准模式
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else if (document.compatMode === 'BackCompat') {
    // 怪异模式
    return {
      width: document.body.clientWidth,
      heigth: document.body.clientHeight
    }
  }
}