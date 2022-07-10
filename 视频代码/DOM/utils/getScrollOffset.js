export function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  }

  return {
    left: document.documentElement.scrollLeft + docuement.body.scrollLeft,
    top: document.documentElement.scrollTop + document.body.scrollTop
  }
}