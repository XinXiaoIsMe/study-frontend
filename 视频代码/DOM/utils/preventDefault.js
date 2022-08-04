export function preventDefault(e) {
  var e = e || window.event

  if (e.preventDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}