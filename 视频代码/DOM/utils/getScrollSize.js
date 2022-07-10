export function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }

  if (document.documentElement.scrollWidth) {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}