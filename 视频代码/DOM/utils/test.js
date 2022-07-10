import './getChildNode.js'
import './getAncestorNode.js'

var container = document.getElementsByClassName('wrap')[0]

var children = container.getChildNode(3)

var parent = container.getAncestorNode(2)

console.log(children, parent)