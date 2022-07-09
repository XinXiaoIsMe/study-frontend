/**
 * 1. 扫描过程中：
 *    禁止：暂停、删除
 * 2. 扫描完成：
 *    根据文件md5值判断，如果文件已经存在服务器，则直接跳到上传完成状态。
 *    如果文件大小超过允许上传的最大值，或者文件损坏，则跳往上传失败状态
 *    其余情况进入上传中状态
 * 3. 上传中：
 *    禁止：删除文件
 *    可以在暂停和继续上传切换
 */

const plugin = (function () {
  const plugin = document.createElement('embed')
  plugin.style.display = 'none'
  plugin.type = 'application/txftn-webkit'
  plugin.sign = function () {
    console.log('开始文件扫描')
  }
  plugin.pause = function () {
    console.log('暂停文件上传')
  }
  plugin.uploading = function () {
    console.log('开始文件上传')
  }
  plugin.del = function () {
    console.log('删除文件上传')
  }
  plugin.done = function () {
    console.log('文件上传完成')
  }
  document.body.appendChild(plugin)
  return plugin
})()

class State {
  constructor(upload) {
    this.upload = upload
  }

  handleButton1() {
    throw new Error('子类必须覆盖handleButton1方法')
  }

  handleButton2() {
    throw new Error('子类必须覆盖handleButton2方法')
  }
}

class SignState extends State {
  handleButton1() {
    console.log('扫描中，点击无效...')
  }

  handleButton2() {
    console.log('文件正在扫描中，不能删除!')
  }
}

class UploadingState extends State {
  handleButton1() {
    this.upload.pause()
  }

  handleButton2() {
    console.log('文件正在上传中，不能删除...')
  }
}

class PauseState extends State {
  handleButton1() {
    this.upload.uploading()
  }

  handleButton2() {
    this.upload.del()
  }
}

class DoneState extends State {
  handleButton1() {
    console.log('文件已完成上传，点击无效')
  }

  handleButton2() {
    this.upload.del()
  }
}

class ErrorState extends State {
  handleButton1() {
    console.log('文件上传失败，点击无效')
  }

  handleButton2() {
    this.upload.del()
  }
}

class Upload {
  constructor(fileName) {
    this.plugin = plugin
    this.fileName = fileName
    this.button1 = null
    this.button2 = null
    this.signState = new SignState(this)
    this.uploadingState = new UploadingState(this)
    this.pauseState = new PauseState(this)
    this.doneState = new DoneState(this)
    this.errorState = new ErrorState(this)
    this.state = this.signState
  }

  init() {
    this.container = document.createElement('div')
    this.container.innerHTML = `
    <span>文件名称：${this.fileName}</span>
    <button data-action="button1">扫描中...</button>
    <button data-action="button2">删除</button>
    `
    document.body.appendChild(this.container)
    this.button1 = this.container.querySelector('[data-action="button1"]')
    this.button2 = this.container.querySelector('[data-action="button2"]')
    this.bindEvent()
  }

  bindEvent() {
    this.button1.addEventListener('click', () => {
      this.state.handleButton1()
    })

    this.button2.addEventListener('click', () => {
      this.state.handleButton2()
    })
  }

  sign() {
    this.plugin.sign()
    this.button1.innerHTML = '扫描中，任何操作无效...'
    this.state = this.signState
  }

  uploading() {
    this.plugin.uploading()
    this.button1.innerHTML = '正在上传，点击暂停'
    this.state = this.uploadingState
  }

  pause() {
    this.plugin.pause()
    this.button1.innerHTML = '已暂停，点击继续上传'
    this.state = this.pauseState
  }

  done() {
    this.plugin.done()
    this.button1.innerHTML = '上传完成'
    this.state = this.doneState
  }

  error() {
    this.button1.innerHTML = '上传失败'
    this.state = this.errorState
  }

  del() {
    this.plugin.del()
    this.container.remove()
  }
}

const upload = new Upload('JavaScript编程精髓')
upload.init()
window.external.upload = function (state) {
  upload[state]()
}
setTimeout(() => {
  window.external.upload('uploading')
}, 3000)
setTimeout(() => {
  window.external.upload('done')
}, 8000)