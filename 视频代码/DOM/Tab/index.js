const oTabItems = document.getElementsByClassName('tab-item')
const oPageItems = document.getElementsByClassName('page-item')
for (var i = 0; i < oTabItems.length; i++) {
  (function (j) {
    oTabItems[j].onclick = function () {
      for (var k = 0; k < oTabItems.length; k++) {
        oTabItems[k].className = 'tab-item'
        oPageItems[k].className = 'page-item'
      }
      this.className = 'tab-item current'
      oPageItems[j].className = 'page-item active'
    }
  })(i)
}