HTMLElement.prototype.getAncestorNode = function (level) {
  if (typeof level !== 'number') throw new TypeError('Level must be a number.')
  if (level < 0) throw new RangeError('Level must >= 0')

  var parentNode = this.parentNode
  for (var i = 1; parentNode && i < level; i++) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}