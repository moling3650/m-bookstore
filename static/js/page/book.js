'use strict'
let match = location.search.match(/[&\?]id=([^&]+)/)
let id = match ? match.pop() : ''

$.get(`/ajax/book?id=${id}`, (d) => {
  new Vue({
    el: '#root',
    data: d,
    methods: {
      readBook () {

      }
    }
  })
}, 'json')
