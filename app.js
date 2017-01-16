'use strict';

let koa = require('koa')
let controller = require('koa-route')
let views = require('co-views')
let koa_static = require('koa-static-server')
let qs = require('querystring')
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

app.use(controller.get('/ajax/', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_index_data()
}))

app.use(controller.get('/ajax/rank', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_rank_data()
}))

app.use(controller.get('/ajax/book', function* () {
  this.set('Cache-Control', 'no-cache')
  let {id} = qs.parse(this.req._parsedUrl.query)
  this.body = service.get_book_data(id || null)
}))

app.use(controller.get('/ajax/female', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_female_data()
}))

app.use(controller.get('/ajax/male', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_male_data()
}))

app.use(controller.get('/ajax/category', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = service.get_category_data()
}))

app.use(controller.get('/ajax/search', function* () {
  this.set('Cache-Control', 'no-cache')
  // 获取查询字符串的参数
  let {start, end, keyword} = qs.parse(this.req._parsedUrl.query)
  // 获取搜索数据
  this.body = yield service.get_search_data(start, end, keyword)
}))

app.use(controller.get('/', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('index')
}))

app.use(controller.get('/book', function* () {
  this.set('Cache-Control', 'no-cache')
  let {id} = qs.parse(this.req._parsedUrl.query)
  this.body = yield render('book', {nav: '书籍详情',bookId: id})
}))

app.use(controller.get('/male', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('male')
}))

app.use(controller.get('/female', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('female')
}))

app.use(controller.get('/rank', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('rank')
}))

app.use(controller.get('/category', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('category')
}))

app.use(controller.get('/reader', function* () {
  this.set('Cache-Control', 'no-cache')
  this.body = yield render('reader')
}))



app.listen(5000)
console.log('Koa server is started')
