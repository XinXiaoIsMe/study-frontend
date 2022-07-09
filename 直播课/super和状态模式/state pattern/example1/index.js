// 法3：使用普通对象或者map实现状态模式

const FSM = {
  success: {
    className: 'model success'
  },
  warning: {
    className: 'model warning'
  },
  error: {
    className: 'model error'
  }
}

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
    // 使用状态模式
    this.model.className = FSM[status].className
  }
}

new Model()