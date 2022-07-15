import Render from '../../render/index.js'

class Header extends Render {
  name = 'Header'
  constructor({ data, path = 'components/header', container = null, on = {} }) {
    const template = `{{title}}`
    super({
      className: 'header',
      template,
      path,
      data,
      container,
      on
    })
  }
}

export default Header
