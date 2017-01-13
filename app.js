'use strict';

let koa = require('koa')
let controller = require('koa-route')
let views = require('co-views')

let app = koa()
let render = views('./view', {
    map: {
        html: 'ejs'
    }
})


app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'no-cache')
    this.body = yield render('index', {name: 'ejs'})
}))

app.listen(5000)
console.log('Koa server is started')