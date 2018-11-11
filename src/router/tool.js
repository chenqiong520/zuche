import Vue from 'vue'

const tool = {}
tool['formatDate'] = (date, format) => {
  const paddNum = function (num) {
    num += ''
    return num.replace(/^(\d)$/, '0$1')
  }
  // 指定格式字符
  const cfg = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear().toString().substring(2),
    M: date.getMonth() + 1,
    MM: paddNum(date.getMonth() + 1),
    d: date.getDate(),
    dd: paddNum(date.getDate()),
    hh: paddNum(date.getHours()),
    mm: paddNum(date.getMinutes()),
    ss: paddNum(date.getSeconds())
  }
  format || (format = 'yyyy-MM-dd hh:mm:ss')
  return format.replace(/([a-z])(\1)*/ig, function (m) {
    return cfg[m]
  })
}

tool['isIdCard'] = (card) => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (reg.test(card)) {
    return true
  }
  return false
}

// 验证手机号
tool['validateTel'] = (tel) => {
  const myreg = /^(086|\+86|0)?1[345789][0-9]{9}$/
  if (myreg.test(tel)) {
    return true
  }
  return false
}
Vue.prototype.$tools = tool
export default tool
