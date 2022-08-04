export function getStyle(el, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(el, null)[prop] : window.getComputedStyle(el, null)
  }

  return prop ? el.currentStyle[prop] : el.currentStyle
}