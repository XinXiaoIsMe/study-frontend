HTMLElement.prototype.reverseNode = function () {
  var children = this.children
  var len = children.length
  while (len--) {
    this.appendChild(children[len])
  }
}