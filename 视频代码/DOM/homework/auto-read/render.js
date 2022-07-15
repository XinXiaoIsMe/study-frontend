class Reader {
  constructor(container, data) {
    this.container = container
    this.data = data.split('\n')
    this.oAutoRun = document.getElementsByClassName('auto-read')[0]
    this.oToTop = document.getElementsByClassName('to-top')[0]
    this.startReadingState = new StartReadingState(this)
    this.stopReadingState = new StopReadingState(this)
    this.readingState = this.startReadingState
    this.endFlag = -1

    this._init()
  }

  _init() {
    this._reader()
    this._bindEvent()
  }

  _reader() {
    const template = this.data.map(p => `<p class="paragraph">${p}</p>`).join('')
    this.container.innerHTML = template
    this.readingState.handleClick(this.oAutoRun)
  }

  _bindEvent() {
    this.oAutoRun.addEventListener('click', () => this.readingState.handleClick.call(this.readingState, this.oAutoRun))
    this.oToTop.addEventListener('click', () => {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
      this.oAutoRun.click()
    })
  }
}

const states = {
  START: '开始',
  STOP: '结束'
}

class ReadingState {
  constructor(reader) {
    this.reader = reader
  }

  handleClick() {
    throw new Error('必须重写父级方法！')
  }
}

class StartReadingState extends ReadingState {
  state = states.START

  handleClick(oAutoRun) {
    this.reader.readingState = this.reader.stopReadingState
    oAutoRun.innerText = states.STOP
    this.reader.endFlag = setInterval(() => {
      window.scrollBy({
        left: 0,
        top: 100,
        behavior: 'smooth'
      })
      const oHtml = document.documentElement
      const scrollTop = oHtml.scrollTop
      const scrollHeight = oHtml.scrollHeight
      const windowHeight = window.innerHeight
      if (scrollTop + windowHeight >= scrollHeight) this.reader.readingState.handleClick(oAutoRun)
    }, 500)
  }
}

class StopReadingState extends ReadingState {
  state = states.STOP

  handleClick(oAutoRun) {
    this.reader.readingState = this.reader.startReadingState
    oAutoRun.innerText = states.START
    clearInterval(this.reader.endFlag)
  }
}

export default Reader
