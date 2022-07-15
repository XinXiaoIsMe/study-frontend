import Header from './components/header/index.js'
import ListItem from './components/list/list-item.js'

new Header({
  data: {
    title: '情人'
  },
  container: '#app'
})

const listItem = new ListItem({
  data: {
    src: './images/book.jpg',
    content: '我已经老了，有一天，在一处公共场所的大厅里，有一个男人向我走来，他主动介绍自己，他对我说：“我认识你，永远记得你，永远记得你。那时候，你还很年轻，人人都说你美，现在，我是特为来告诉你...”',
    href: '//baidu.com'
  },
  container: '#app'
})

console.log('list-item', listItem)
