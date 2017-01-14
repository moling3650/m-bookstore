'use strict'

let fs = require('fs')

// 获取mock的测试数据
exports.get_test_data = function () {
  let content = fs.readFileSync('./mock/test.json', 'utf-8')
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
