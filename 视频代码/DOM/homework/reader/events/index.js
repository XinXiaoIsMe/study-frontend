class Event {
  constructor() {
    this._events = {}
  }

  $on(eventName, cbs, isNative = false) {
    const events = this._events[eventName] || []
    const callbacks = Array.isArray(cbs) ? cbs : [cbs]
    callbacks.forEach(cb => {
      if (typeof cb === 'function') events.push(cb)
    })
    if (eventName.startsWith('native-')) {
      events.nativeEvent = (...args) => this.$emit(eventName, ...args)
      this.el.addEventListener(eventName.replace('native-', ''), events.nativeEvent, false)
    }
    this._events[eventName] = events
  }

  $emit(eventName, ...args) {
    const events = this._events[eventName] || []
    events.forEach(cb => cb(...args))
  }

  $off(eventName, cbs) {
    const callbacks = Array.isArray(cbs) ? cbs : [cbs]
    const restCbs = []
    const events = this._events[eventName]
    const nativeEventCb = events.nativeEvent
    if (!cbs) {
      this.el.removeEventListener(eventName, nativeEventCb)
      this._events[eventName] = null
      return
    }

    events.forEach(cb => {
      if (callbacks.every(fn => fn === cb)) return
      restCbs.push(cb)
    })
    this._events[eventName] = restCbs
    if (restCbs.length) restCbs.nativeEvent = nativeEventCb
    else this.el.removeEventListener(eventName, this._events[eventName])
  }
}

export default Event
