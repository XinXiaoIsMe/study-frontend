import { setRequestAnimationFrame } from './utils.js'

class Carousel {
  constructor(opts) {
    this._opts = opts
    const {
      container,
      data
    } = opts
    this.container = this.getContainer(container)
    this.data = this.getData(data)
    this.scrollIndex = 0
    this.activeIndex = 0
    this.stop = false
    this.timer = -1

    this.init()
  }

  init() {
    this.render()
    this.bindEvent()
  }

  render() {
    const oCarousel = document.createElement('div')
    const template = (data) => `
    <ul class="carousel-list">
      ${data.map(src => `
        <li class="carousel-item">
          <a href="javascript:;">
            <img src="${src}" />
          </a>
        </li>
        `).join('')
      }
    </ul>
    <div class="carousel-arrow carousel-arrow-l">&lt;</div>
    <div class="carousel-arrow carousel-arrow-r">&gt;</div>
    <div class="carousel-circle">
      ${data.slice(1).map((_, index) => `<a href="javascript:;" class="carousel-circle-item" data-role="carousel-circle-item" data-index=${index}></a>`).join('')
      }
    </div>
    `
    oCarousel.className = 'carousel'
    oCarousel.innerHTML = template(this.data)
    this.container.appendChild(oCarousel)

    this.oCarousel = oCarousel
    this.oCarouselList = this.container.querySelector('.carousel-list')
    this.oCarouselArrows = this.container.querySelectorAll('.carousel-arrow')
    this.oCarouselCircleWrap = this.container.querySelector('.carousel-circle')
    this.oCarouselCircles = [...this.oCarouselCircleWrap.children]
    this.oCarouselList.style.transition = 'all 1s'
    this.setActiveCircle()

    this.autoRun()
  }

  autoRun() {
    this.run()
    this.timer = setTimeout(() => {
      this.scrollIndex += 1
      this.autoRun()
    }, 2000)
  }

  run() {
    this.activeIndex = this.scrollIndex < 0
      ? (this.data.length - 2)
      : (this.scrollIndex % (this.data.length - 1))
    this.setActiveCircle()
    this.setCarouselListLeft()
  }

  bindEvent() {
    this.oCarouselArrows.forEach(arrow => arrow.addEventListener('click', setRequestAnimationFrame(
      this.handleClickArrow.bind(this, arrow.classList.contains('carousel-arrow-l') ? -1 : 1),
      1000
    )))
    this.oCarouselCircleWrap.addEventListener('click', this.handleClickCircle.bind(this))
    this.oCarousel.addEventListener('mouseenter', this.handleMouseEnterCarousel.bind(this))
    this.oCarousel.addEventListener('mouseleave', this.handleMouseLeaveCarousel.bind(this))
  }

  handleClickArrow(direction) {
    this.scrollIndex += direction
    this.run()
  }

  handleClickCircle(evt) {
    const event = evt || window.event
    const tar = event.target || event.srcElement
    const dataset = tar.dataset
    const role = dataset.role
    if (role !== 'carousel-circle-item') return

    this.scrollIndex = parseInt(dataset.index)
    this.setActiveCircle()
    this.run()
  }

  handleMouseEnterCarousel() {
    this.stop = true
    clearTimeout(this.timer)
  }

  handleMouseLeaveCarousel() {
    this.stop = false
    this.autoRun()
  }

  setCarouselListLeft() {
    if (this.scrollIndex === this.data.length) {
      this.oCarouselList.style.transition = 'all 0s'
      this.oCarouselList.style.left = 0
      this.scrollIndex = 1
    } else if (this.scrollIndex < 0) {
      this.oCarouselList.style.transition = 'all 0s'
      this.oCarouselList.style.left = (this.data.length - 1) * -500 + 'px'
      this.scrollIndex = this.data.length - 2
    }
    this.oCarouselList.offsetWidth // 触发一次重绘
    this.oCarouselList.style.transition = 'left .5s'
    this.oCarouselList.style.left = this.scrollIndex * -500 + 'px'
  }

  setActiveCircle() {
    this.oCarouselCircles.forEach(circle => circle.classList.remove('is-active'))
    this.oCarouselCircles[this.activeIndex].classList.add('is-active')
  }

  getContainer(container) {
    return container instanceof HTMLElement
      ? container
      : (
        document.querySelector(container)
        ||
        document.body
      )
  }

  getData(data) {
    return [...data, data[0]]
  }
}

export default Carousel
