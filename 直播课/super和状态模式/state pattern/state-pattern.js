// 法2：状态模式

const state = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

class State {
  get className () {
    switch (this.status) {
      case state.SUCCESS:
        return 'model success'
      case state.WARNING:
        return 'model warning'
      case state.ERROR:
        return 'model error'
      default:
        return 'model'
    }
  }
}

class SuccessState extends State {
  status = state.SUCCESS
}

class WarningState extends State {
  status = state.WARNING
}

class ErrorState extends State {
  status = state.ERROR
}

class StateFactory {
  static create (status) {
    switch (status) {
      case state.SUCCESS:
        return new SuccessState()
      case state.WARNING:
        return new WarningState()
      case state.ERROR:
        return new ErrorState()
      default:
        return
    }
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
    // this.model.className = 'model ' + status

    // 使用状态模式
    this.state = StateFactory.create(status)
    this.model.className = this.state.className
  }
}

new Model()