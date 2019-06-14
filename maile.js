const mailer = require('nodemailer');
function sendMail(sendmessage, info) {
    let mailTransport = mailer.createTransport({
        service: 'qq',
        port: '465',
        secure: false,
        auth: {
            user: '741779880@qq.com',
            pass: xxxxxxxxxxxxxxxxxx //不是邮箱的密码，从qq邮箱设置里面可以看到
        }
    });
    mailTransport.sendMail({
        from: '741779880@qq.com',
        to: '1261854605@qq.com',
        subject: '亲爱的小松果，记得打卡哦！！！',
        text: sendmessage
    });
    mailTransport.sendMail({
        from: '741779880@qq.com',
        to: '741779880@qq.com',
        subject: '今日信息',
        text: info
    });
}
module.exports = sendMail;