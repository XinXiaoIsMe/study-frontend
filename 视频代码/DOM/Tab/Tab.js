; (function (win, doc) {
  var Tab = function (opts) {
    this.tabItem = opts.tabItem
    this.pageItem = opts.pageItem
    this.current = opts.current
    this.active = opts.active
    this.oTabItems = doc.getElementsByClassName(this.tabItem)
    this.oPageItems = doc.getElementsByClassName(this.pageItem)

    this.bindClick(this.tabItem, this.pageItem, this.current, this.active)
  }

  Tab.prototype = {
    bindClick(tabItem, pageItem, current, active) {
      var oTabItems = this.oTabItems
      var oPageItems = this.oPageItems
      var len = oTabItems.length
      for (var i = 0; i < len; i++) {
        ; (function (j) {
          oTabItems[j].onclick = function () {
            for (var k = 0; k < len; k++) {
              oTabItems[k].className = tabItem
              oPageItems[k].className = pageItem
            }
            this.className = tabItem + ' ' + current
            oPageItems[j].className = pageItem + ' ' + active
          }
        })(i)
      }
    }
  }

  win.Tab = Tab
})(window, document)