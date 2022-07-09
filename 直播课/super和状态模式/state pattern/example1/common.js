// 法1：常规方法
class Model {
  constructor () {
    this.init()
  }

  init () {
    this.model = document.querySelector('.model')
    this.btnGroup = document.querySelector('.btn-group')
    this.bindEvent()
  }

  bindEvent () {
    this.btnGroup.addEventListener('click', this.handleBtnClick.bind(this))
  }

  handleBtnClick (evt) {
    const event = evt || window.event
    const tar = event.target || event.srcElement
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'button') {
      const status = tar.dataset.status
      this.changeState(status)
    }
  }

  changeState (status) {
    this.model.className = 'model ' + status
  }
}

new Model()