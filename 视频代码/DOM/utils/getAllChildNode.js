import './getChildNode.js'

HTMLElement.prototype.getAllChildNode = function () {
  var childNodes = []
  _getAllChildNode(this, childNodes)
  return childNodes
}

function _getAllChildNode(node, result) {
  var children = node.getChildNode()
  children.forEach(child => {
    result.push(child)
    _getAllChildNode(child, result)
  })
}
