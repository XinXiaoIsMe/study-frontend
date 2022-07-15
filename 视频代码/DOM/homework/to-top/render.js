export default class Render {
  constructor(container, data) {
    this.container = container
    this.data = data
    this.init()
  }

  init() {
    const template = this._render()
    this.container.innerHTML = template
  }

  _render() {
    return this.data.map(({ img, title, desc }) => (`<div class="menu-item">
    <a href="http://127.0.0.1:5500/%E8%A7%86%E9%A2%91%E4%BB%A3%E7%A0%81/DOM/homework/auto-read/index.html" class="chapter">
      <div class="chapter-img-wrap">
        <img src="${img}" alt="侠客行" class="chapter-img">
      </div>
      <div class="chapter-preview">
        <h3 class="chapter-title">${title}</h3>
        <p class="chapter-desc">${desc}</p>
      </div>
    </a>
  </div>`)).join('')
  }
}