import {
  getDom,
  addEvent,
  getStyles,
  contains,
  getViewportSize,
  clamp,
  preventDefault,
  isType
} from './utils.js'

class Draggable {
  constructor(opts) {
    const {
      container,
      dragArea,
      disableDragArea,
      onDragStart,
      onDragging,
      onDragEnd
    } = opts
    this.container = getDom(container)
    this.dragArea = getDom(dragArea) || this.container
    this.disableDragArea = getDom(disableDragArea)
    this.onDragStart = isType(onDragStart, 'function') ? onDragStart : function () { }
    this.onDragging = isType(onDragging, 'function') ? onDragging : function () { }
    this.onDragEnd = isType(onDragEnd, 'function') ? onDragEnd : function () { }
    this.containerWidth = parseInt(getStyles(this.container, 'width'))
    this.containerHeight = parseInt(getStyles(this.container, 'height'))
    this.offsetX = ''
    this.offsetY = ''
    this.moving = false

    this._init()
  }

  _init() {
    this._bindEvent()
  }

  _bindEvent() {
    addEvent(this.container, 'mousedown', this.dragStart.bind(this))
    addEvent(document, 'mousemove', this.dragging.bind(this))
    addEvent(document, 'mouseup', this.dragEnd.bind(this))
  }

  dragStart(e) {
    const event = e || window.event
    const tar = event.target || event.srcElement
    preventDefault(event)
    if (
      (
        !contains(tar, this.dragArea)
        &&
        tar !== this.dragArea
      )
      ||
      (
        this.disableDragArea
        &&
        (
          tar === this.disableDragArea
          ||
          contains(tar, this.disableDragArea)
        )
      )
    ) return

    this.moving = true
    this.offsetX = e.clientX - parseInt(getStyles(this.container, 'left'))
    this.offsetY = e.clientY - parseInt(getStyles(this.container, 'top'))
    this.onDragStart(this.offsetX, this.offsetX)
  }

  dragging(e) {
    if (!this.moving) return

    const event = e || window.event
    const { width: viewportWidth, height: viewportHeight } = getViewportSize()
    const minLeft = 0
    const minTop = 0
    const maxLeft = viewportWidth - this.containerWidth
    const maxTop = viewportHeight - this.containerHeight
    const containerLeft = clamp(event.clientX - this.offsetX, minLeft, maxLeft)
    const containerTop = clamp(event.clientY - this.offsetY, minTop, maxTop)

    this.container.style.left = containerLeft + 'px'
    this.container.style.top = containerTop + 'px'
    this.container.style.opacity = 0.5
    this.onDragging(containerLeft, containerTop)
  }

  dragEnd() {
    this.moving = false
    this.onDragEnd(parseInt(getStyles(this.container, 'left')), parseInt(getStyles(this.container, 'top')))
    this.container.style.opacity = 1
  }
}

export default Draggable
