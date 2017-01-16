'use strict'
$.get('/ajax/', (d) => {
  let offset = $($('.swipe-tab').find('a')[0]).offset()
  new Vue({
    el: '#root',
    data: {
      screen_width: Math.max($(window).width(), 320),
      index_header_tab_width: offset.width,
      top: d.items[0].data.data,
      hot: d.items[1].data.data,
      recommend: d.items[2].data.data,
      female: d.items[3].data.data,
      male: d.items[4].data.data,
      free: d.items[5].data.data,
      topic: d.items[6].data.data,
      duration: 0,
      position: 0,
      header_position: 0,
      header_duration: 0,
      tab_1_class: 'swipe-tab__on',
      tab_2_class: ''
    },
    methods:{
      tabSwitch (pos) {
        this.duration = 0.5
        this.header_duration = 0.5
        if (pos == 0) {
          this.position = 0
          this.header_position = 0
          this.tab_1_class = 'swipe-tab__on'
          this.tab_2_class = ''
        } else {
          this.position = (-this.screen_width)
          this.header_position = this.index_header_tab_width
          this.tab_1_class = ''
          this.tab_2_class = 'swipe-tab__on'
        }
      }
    }
  })
}, 'json')
