'use strict';
const nodeMailer = require('nodemailer')

//创建发送邮件的请求对象
let transporter = nodeMailer.createTransport({
    host: "smtp.qq.com",  //发送方的邮箱
    port: 465, //端口号
    secure: true, // true for 465, false for other ports
    auth: {
        user: '273851541@qq.com', // 发送方的邮箱地址
        pass: 'rvrihffkuunocajj', // mtp 验证码
    },
});


function send(mail, code) {
    return new Promise((resolve, reject) => {
        // 邮件信息,发送邮件
        transporter.sendMail({
            from: '"来自VaeFans" <273851541@qq.com>', // sender address
            to: mail, // list of receivers
            subject: "验证码", // Subject line
            text: "您的验证码是:" + code + ",有效期5分钟", // plain text body
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

module.exports = {send};