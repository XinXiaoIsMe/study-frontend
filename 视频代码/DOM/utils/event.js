export function addEvent(el, event, cb) {
  if (el.addEventListener) {
    el.addEventListener(event, cb, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, cb)
  } else {
    el['on' + event] = cb
  }
}

export function removeEvent(el, event, cb) {
  if (el.removeEventListener) {
    el.removeEventListener(event, cb, false)
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, cb)
  } else {
    el['on' + event] = null
  }
}
