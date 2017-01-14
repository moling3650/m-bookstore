'use strict'

let fs = require('fs')

// 获取mock的测试数据
exports.get_test_data = function () {
  let content = fs.readFileSync('./mock/test.json', 'utf-8')
  return content
}
