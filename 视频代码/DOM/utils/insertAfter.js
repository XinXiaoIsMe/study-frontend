import './findElementSibling.js'

HTMLElement.prototype.insertAfter = function (child) {
  var afterChild = child.findElementSibling(1)
  var parent = child.parentNode
  return parent.insertBefore(this, afterChild)
}