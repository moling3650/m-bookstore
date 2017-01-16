'use strict'
let match = location.search.match(/[&\?]id=([^&]+)/)
let id = match ? match.pop() : ''

$.get(`/ajax/book?id=${id}`, (d) => {
  new Vue({
    el: '#root',
    data: {
      screen_width: Math.max($(window).width(), 320),
      item: d.item,
      author_books: d.author_books,
      related: d.related
    },
    methods: {
      readBook () {

      }
    }
  })
}, 'json')
