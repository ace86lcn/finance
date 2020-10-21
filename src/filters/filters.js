// 将时间戳转日期格式的过滤器(时间戳转yyyy-mm-dd)
exports.dateFormat = (dataStr, type = 'normal') => {
    var time = new Date(dataStr)

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str
    }
    return str
  }
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()

  if(type == 'normal') {
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
  } else if(type == 'month') {
    return y + '-' + timeAdd0(m)
  } else if(type == 'all') {
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s)
  }
}

// 时间截取(yyyy-mm-dd hh-mm-ss时间转yyyy-mm-dd)
exports.dateSlice = date => {
    return date.slice(0, 10)
}

// 项目状态转换
exports.projectStatusText = status => {
  if(status == '001') {
    return '筹备'
  } else if(status == '002') {
    return '立项'
  } else if(status == '003') {
    return '在建'
  } else if(status == '004') {
    return '完工'
  } else if(status == '005') {
    return '停工'
  }
}

// 项目分类转换
exports.projectCategoryText = category => {
  var categoryText;
  switch(category) {
    case '01':
      categoryText = '房屋建筑工程'
      break;
    case '02':
      categoryText = '市政公用工程'
      break;
    case '03':
      categoryText = '机电安装工程'
      break;
    case '04':
      categoryText = '铁路工程'
      break;
    case '05':
      categoryText = '公路工程'
      break;
    case '06':
      categoryText = '港口与航道工程'
      break;
    case '07':
      categoryText = '水利水电工程'
      break;
    case '08':
      categoryText = '电力工程'
      break;
    case '09':
      categoryText = '矿山工程'
      break;
    case '10':
      categoryText = '冶炼工程'
      break;
    case '11':
      categoryText = '化工石油工程'
      break;
    case '12':
      categoryText = '通信工程'
      break;
    case '99':
      categoryText = '其他'
      break;
  } 
  return categoryText
}