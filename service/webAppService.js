'use strict'

let fs = require('fs')

// 获取首页的数据
exports.get_index_data = function () {
  let content = fs.readFileSync('./mock/home.json', 'utf-8')
  return content
}

// 获取排行榜的数据
exports.get_rank_data = function () {
  let content = fs.readFileSync('./mock/rank.json', 'utf-8')
  return content
}

// 获取一本书的数据
exports.get_book_data = function (id) {
  id = id || '18218'
  let content = fs.readFileSync(`./mock/book/${id}.json`, 'utf-8')
  return content
}

// 获取女性频道的数据
exports.get_female_data = function () {
  let content = fs.readFileSync('./mock/channel/female.json', 'utf-8')
  return content
}

// 获取男性频道的数据
exports.get_male_data = function () {
  let content = fs.readFileSync('./mock/channel/male.json', 'utf-8')
  return content
}

// 获取分类的数据
exports.get_category_data = function () {
  let content = fs.readFileSync('./mock/category.json', 'utf-8')
  return content
}

// 获取搜索的数据
exports.get_search_data = function (start, end, keyword) {
  return function (callback) {
    let http = require('http')
    // 封装http请求的参数
    let qs = require('querystring')
    let data = {
      start,
      end,
      s:keyword
    }
    let http_request = {
      hostname: 'dushu.xiaomi.com',
      port: 80,
      path: `/store/v0/lib/query/onebox?${qs.stringify(data)}`
    }
    // 封装http请求对象
    let req_obj = http.request(http_request, function (_res) {
      let content = ''
      _res.setEncoding('utf8')
      _res.on('data', function (chunk) {
        content += chunk
      })

      _res.on('end', function () {
        callback(null, content)
      })
    })

    req_obj.on('error', function () {

    })

    req_obj.end()
  }
}
