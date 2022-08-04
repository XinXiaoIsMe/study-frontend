import { getScrollOffset } from './getScrollOffset.js'

export function pagePos(e) {
  var sLeft = getScrollOffset().left
  var sTop = getScrollOffset().top
  var cLeft = document.documentElement.clientLeft || 0 // 获取IE低版本浏览器可能出现的文档偏移
  var cTop = document.documentElement.clientTop || 0

  return {
    X: e.clientX + sLeft - cLeft, // 鼠标相对于可视区的距离 + 文档的滚动距离 - 文档的偏移距离
    Y: e.clientY + sTop - cTop
  }
}