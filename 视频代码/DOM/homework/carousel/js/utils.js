export function getElementSize(el, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(el)[prop] : window.getComputedStyle(el)
  } else {
    return prop ? window.currentStyle[prop] : window.currentStyle
  }
}

export function setRequestAnimationFrame(cb, time) {
  let startTime = Date.now()
  let timer

  return function () {
    timer = requestAnimationFrame(function callback() {
      cancelAnimationFrame(timer)
      const endTime = Date.now()
      if (endTime - startTime >= time) {
        cb()
        startTime = endTime
      }
    })
  }
}
