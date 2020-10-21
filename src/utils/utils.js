const CryptoJS = require('./crypto-js') 


// 时间戳转化为年月日
const  timestampToTime = timestamp => {
    var date = new Date(timestamp)         //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate()*1 < 10 ? '0'+date.getDate() : date.getDate()
    return Y + M + D
}

// 时间戳转化为年月
const  timestampToYM = timestamp => {
    var date = new Date(timestamp)         //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    return Y + M
}

// crypto-js加密
const encryptByDES = (message, key='HzMoYun2020') => {
    var keyHex = CryptoJS.enc.Utf8.parse(key)
    var encrypted = CryptoJS.DES.encrypt(message+'', keyHex, {
            mode: CryptoJS.mode.ECB,
            padding:CryptoJS.pad.Pkcs7
        }
    )
    return encrypted.toString()
}

// 下载图片
const downloadIamge = (imgsrc, name) => {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous")
    image.onload = function() {
        var canvas = document.createElement("canvas")
        canvas.width = image.width
        canvas.height = image.height;
        var context = canvas.getContext("2d")
        context.drawImage(image, 0, 0, image.width, image.height)
        //得到图片的base64编码数据
        var url = canvas.toDataURL("image/png") 
    
        // 生成一个a元素
        var a = document.createElement("a") 
        // 创建一个单击事件
        var event = new MouseEvent("click") 
        // 设置图片名称
        a.download = name || "photo" 
        // 将生成的URL设置为a.href属性
        a.href = url 
        // 触发a的单击事件
        a.dispatchEvent(event) 
    };
    image.src = imgsrc
}

export { 
    timestampToTime,
    timestampToYM,
    encryptByDES,
    downloadIamge
}