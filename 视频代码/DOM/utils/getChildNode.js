HTMLElement.prototype.getChildNode = function (index) {
  var childNodes = this.childNodes
  var children = []
  for (var i = 0, len = childNodes.length; i < len; i++) {
    var childNode = childNodes[i]
    if (childNode.nodeType === 1) children.push(childNode)
  }

  if (typeof index === 'number') return children[index]
  return children
}