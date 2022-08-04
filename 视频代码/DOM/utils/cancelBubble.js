export function cancelBubble(e) {
  var e = e || window.event

  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    e.cancelBubble = true
  }
}