import './getAncestorNode.js'

HTMLElement.prototype.findElementSibling = function (index) {
  if (typeof index !== 'number') throw new TypeError('Index must be a number.')

  if (!index) return this

  var parent = this.parentNode
  if (!parent) return null

  var children = parent.getChildNode()
  var curIndex = children.findIndex(child => child === this)
  var targetIndex = curIndex + index
  if (targetIndex < 0 || targetIndex >= children.length) return null
  return children[targetIndex]
}