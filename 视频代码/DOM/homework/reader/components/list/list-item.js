import Render from '../../render/index.js'

class ListItem extends Render {
  name = 'ListItem'
  constructor({ data, path = 'components/list', container = null, on = {} }) {
    const template = `
    <a href="{{href}}">
      <div class="list-item-img">
        <img src="{{src}}" />
      </div>
      <div class="list-item-content">{{content}}</div>
    </a>
    `
    super({
      className: 'list-item',
      template,
      path,
      data,
      container,
      on
    })
  }
}

export default ListItem
