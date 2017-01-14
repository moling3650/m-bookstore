'use strict';

let koa = require('koa')
let controller = require('koa-route')
let views = require('co-views')
let koa_static = require('koa-static-server')
let service = require('./service/webAppService.js')

// 初始化服务器
let app = koa()

// 初始化服务端渲染器
let render = views('./view', {
  map: {
    html: 'ejs'
  }
})

// 初始化静态资源服务器
app.use(koa_static({
  rootDir: './static/',
  rootPath: '/static/',
  maxage: 0
}))

app.use(controller.get('/', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_test_data()
}))

app.use(controller.get('/ajax/search', function* () {
  this.set('Cache-Control', 'no-cache')
  // 获取查询字符串的参数
  let qs = require('querystring')
  let {start, end, keyword} = qs.parse(this.req._parsedUrl.query)
  // 获取搜索数据
  this.body = yield service.get_search_data(start, end, keyword)
}))

app.listen(5000)
console.log('Koa server is started')
