// By Noahlam  2017-11-28
function toMoney(num) {
  //先把字符串里面除了数字跟.以外的字符去掉
  let replacenum = num.replace(/[^\d\.]/g,'')
  //把得到的字符串转换成带2位小数的浮点数
  let fixednum = parseFloat(replacenum).toFixed(2)
  //把浮点数拆分成整数和小数2部分
  let apartnum =String(fixednum).split('.')
  //把整数部分用toLocaleString方法自动格式化成有千位符的字符串
  let localnum = parseInt(apartnum[0]).toLocaleString()
  //最后 把千位符的字符串 加上小数点 和小数部分 得到完整的结果
  let result =localnum+'.'+ apartnum[1]
  return result
}