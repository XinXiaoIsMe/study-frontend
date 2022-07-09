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

class Upload {
  constructor(fileName) {
    this.plugin = plugin
    this.fileName = fileName
    this.button1 = null
    this.button2 = null
    this.state = 'sign'
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
      if (this.state === 'sign') {
        console.log('扫描中，点击无效...')
      } else if (this.state === 'uploading') {
        this.changeState('pause')
      } else if (this.state === 'pause') {
        this.changeState('uploading')
      } else if (this.state === 'done') {
        console.log('文件已完成上传，点击无效')
      } else if (this.state === 'error') {
        console.log('文件上传失败，点击无效')
      }
    })

    this.button2.addEventListener('click', () => {
      if (this.state === 'done' || this.state === 'error' || this.state === 'pause') {
        this.changeState('del')
      } else if (this.state === 'sign') {
        console.log('文件正在扫描中，不能删除!')
      } else if (this.state === 'uploading') {
        console.log('文件正在上传中，不能删除!')
      }
    })
  }

  changeState(state) {
    switch (state) {
      case 'sign':
        this.plugin.sign()
        this.button1.innerHTML = '扫描中，任何操作无效...'
        break
      case 'uploading':
        this.plugin.uploading()
        this.button1.innerHTML = '正在上传，点击暂停'
        break
      case 'pause':
        this.plugin.pause()
        this.button1.innerHTML = '已暂停，点击继续上传'
        break
      case 'done':
        this.plugin.done()
        this.button1.innerHTML = '上传完成'
        break
      case 'error':
        this.button1.innerHTML = '上传失败'
        break
      case 'del':
        this.plugin.del()
        this.container.remove()
        console.log('删除完成')
        break
      default:
        break
    }

    this.state = state
  }
}

const upload = new Upload('JavaScript编程精髓')
upload.init()
window.external.upload = function (state) {
  upload.changeState(state)
}
setTimeout(() => {
  window.external.upload('uploading')
}, 1000)
setTimeout(() => {
  window.external.upload('done')
}, 8000)