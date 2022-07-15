import Render from '../../render/index.js'
import ListItem from './list-item.js'

class List extends Render {
  name = 'List'
  constructor({ data, path = 'components/list', container = null, on = {} }) {
    const listItems = data.map((item) => new ListItem({
      data: item,
      path: path + '/index.css',
      container: null,
      on: {}
    }))
    const template = ''
    console.log('list', listItems)
    super({
      className: 'list',
      data: {},
      template,
      path,
      container,
      on
    })
  }
}

export default List
