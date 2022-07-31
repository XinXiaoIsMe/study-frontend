import { addEvent } from "../../../utils/event.js"

const status = {
  ADD: 'add',
  EDIT: 'edit'
}

class Todolist {
  constructor(opts) {
    const {
      container,
      data
    } = opts

    this.container = this._getContainer(container)
    this.data = data
    this.status = status.ADD
    this.editId = -1
    this._init()
  }

  _init() {
    this._render()
    this._bindEvent()
  }

  _render() {
    const headerTemplate = '<div class="todolist__header"><input type="text" class="todolist__input" /><button class="todolist__add-btn">增加</button></div>'
    const mainTemplate = `<ul class="todolist__list">
      ${this.data
        .map(({ content, id }) => `
        <li data-id="${id}" class="todolist__list-item">
          <span class="todolist__content">${content}</span>
          <a href="javascript:;" class="todolist__edit">编辑</a>
          <a href="javascript:;" class="todolist__del">删除</a>
        </li>`)
        .join('')
      }
    </ul>`
    const oTodolist = document.createElement('div')
    oTodolist.className = 'todo-list'
    oTodolist.innerHTML = (headerTemplate + mainTemplate)
    this.container.appendChild(oTodolist)
  }

  _bindEvent() {
    this.oTodolistInput = document.getElementsByClassName('todolist__input')[0]
    this.oTodolistAddBtn = document.getElementsByClassName('todolist__add-btn')[0]
    this.oTodolistList = document.getElementsByClassName('todolist__list')[0]

    addEvent(this.oTodolistAddBtn, 'click', this._handleBtnClick.bind(this))
    addEvent(this.oTodolistInput, 'keyup', this._handleEnterInput.bind(this))
    addEvent(this.oTodolistList, 'click', this._handleClickTodolist.bind(this))
  }

  _handleEnterInput(event) {
    event = event || window.event
    const isEnterPressed = event.keyCode === 13
    if (isEnterPressed) this._handleBtnClick()
  }

  _handleBtnClick() {
    const task = this.oTodolistInput.value.trim()
    const newId = Date.now()
    if (!task) return

    switch (this.status) {
      case status.EDIT:
        const oLi = this.oTodolistList.children[this.editId]
        const oSpan = oLi.children[0]
        oSpan.innerText = task
        this._changeStatus(status.ADD)
        this.editId = -1
        break
      case status.ADD:
        this.oTodolistList.innerHTML += `
        <li data-id="${newId}" class="todolist__list-item">
          <span class="todolist__content">${task}</span>
          <a href="javascript:;" class="todolist__edit">编辑</a>
          <a href="javascript:;" class="todolist__del">删除</a>
        </li>`
        break
      default:
        break
    }

    this.oTodolistInput.value = ''
    this.oTodolistAddBtn.innerText = '添加'
  }

  _changeStatus(status) {
    this.status = status
  }

  _handleClickTodolist(event) {
    event = event || window.event
    const tar = event.target || event.srcElement
    const className = tar.className

    switch (className) {
      case 'todolist__edit':
        this._handleEditTask(tar)
        break
      case 'todolist__del':
        this._handleRemoveTask(tar)
        break
      default:
        break
    }
  }

  _handleEditTask(tar) {
    const oLi = tar.parentNode
    const oLiChildren = oLi.children
    const oSpan = oLiChildren[0]
    const content = oSpan.innerText
    const indexOf = Array.prototype.indexOf
    const index = indexOf.call(this.oTodolistList.children, oLi)

    this.oTodolistInput.value = content
    this.oTodolistAddBtn.innerText = `正在编辑第${index + 1}项`
    this.editId = index
    this._changeStatus(status.EDIT)
  }

  _handleRemoveTask(tar) {
    const oLi = tar.parentNode
    oLi.remove()
  }

  _getContainer(container) {
    return container instanceof HTMLElement
      ? container
      : (
        typeof container === 'string'
          ? (document.querySelector(container) || document.body)
          : document.body
      )
  }
}

export default Todolist
