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

app.listen(5000)
console.log('Koa server is started')
