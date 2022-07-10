import './getChildNode.js'
import './getAncestorNode.js'
import './hasChildElementNode.js'
import './findElementSibling.js'
import './getAllChildNode.js'
import './insertAfter.js'
import './reverseNode.js'

var container = document.getElementsByClassName('wrap')[0]

var child = container.getChildNode(3)
console.log('getChildNode', child)

var parent = container.getAncestorNode(2)
console.log('getAncestorNode', parent)

var node = document.createElement('div')
var isChild1 = container.hasChildElementNode(node)
var isChild2 = container.hasChildElementNode(child)
console.log('hasChildElementNode', isChild1, isChild2)

var sibling1 = child.findElementSibling(-1)
var sibling2 = child.findElementSibling(1)
console.log('findElementSibling', sibling1, sibling2)

var children = container.getAllChildNode()
console.log('getAllChildNode', children)

var node = document.createElement('div')
node.innerText = '123'
var oBaidu = container.getElementsByClassName('baidu')[0]
console.log('insertAfter', node.insertAfter(oBaidu))

console.log('------------------ reverse node -----------------')
container.reverseNode()
