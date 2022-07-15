import Event from '../events/index.js'

class Render extends Event {
  constructor({ template = '', path = '', data = {}, className = '', container = null, on, slots = [] }) {
    super()
    this.template = template
    this.rawTemplate = template
    this.path = path + '/index.css'
    this.className = className
    this.data = data
    this.el = null
    this.on = on
    this.slots = slots
    this.container = this._getContainer(container)

    this.render()
  }

  render() {
    const oWrap = document.createElement('div')
    this.template = this._renderTemplate()
    oWrap.innerHTML = this.template
    oWrap.className = (this.className + ' ' + (this.data.customClass || []).join(' ')).trim()
    this.el = oWrap
    if (this.container) this.container.appendChild(oWrap)
    this._bindStyle()
    this._bindEvent()
  }

  _renderTemplate() {
    const reg = /\{\{(.*)\}\}/g
    return this.template.replace(reg, (_, key) => this.data[key])
  }

  _bindStyle() {
    const link = document.createElement('link')
    link.href = this.path
    link.setAttribute('rel', 'stylesheet')
    document.head.appendChild(link)
  }

  _getContainer(container) {
    return container instanceof HTMLElement
      ? container
      : (
        typeof container === 'string'
          ? document.querySelector(container)
          : null
      )
  }

  _bindEvent() {
    for (const [eventName, cb] of Object.entries(this.on)) {
      super.$on(eventName, cb)
    }
  }
}

export default Render
