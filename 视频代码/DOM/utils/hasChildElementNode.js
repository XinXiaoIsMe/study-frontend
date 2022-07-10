import './getChildNode.js'

HTMLElement.prototype.hasChildElementNode = function (node) {
  const children = this.getChildNode()
  return children.some(child => child === node)
}