export function getDom(domOrString) {
  return domOrString instanceof HTMLElement
    ? domOrString
    : (
      typeof domOrString === 'string'
        ? document.querySelector(domOrString)
        : null
    )
}

export function addEvent(el, event, cb) {
  if (document.addEventListener) {
    el.addEventListener(event, cb, false)
  } else if (document.attachEvent) {
    el.attachEvent('on' + event, cb)
  } else {
    el['on' + event] = cb
  }
}

export function removeEvent(el, event, cb) {
  if (document.removeEventListener) {
    el.removeEventListener(event, cb, false)
  } else if (document.detachEvent) {
    el.detachEvent('on' + event, cb)
  } else {
    el['on' + event] = null
  }
}

export function getStyles(el, prop) {
  if (window.getComputedStyle) {
    return prop ? window.getComputedStyle(el, null)[prop] : window.getComputedStyle(el, null)
  } else {
    return prop ? el.currentStyle[prop] : el.currentStyle
  }
}

export function contains(el, parent) {
  if (!el || !parent || (el === parent)) return false

  let dom = el.parentNode
  while (dom) {
    if (dom === parent) return true
    dom = dom.parentNode
  }

  return false
}

export function clamp(val, min, max) {
  if (val < min) return min
  else if (val > max) return max
  else return val
}

export function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else if (document.compatMode === 'CSS1Compat') {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  }
}

export function preventDefault(e) {
  if (e.prevetnDefault) {
    e.preventDefault()
  } else {
    e.returnValue = false
  }
}

export function getType(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}

export function isType(arg, type) {
  return getType(arg) === type
}
