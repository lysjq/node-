const schedule = require('node-schedule');
const path = require('path')
const axios = require('axios');
const logger = require('./logger');
const querydate = require('./sendmessage');
const mail = require('./maile');
const weather = require('./weather');
const queryurl = 'http://v.juhe.cn/sms/send?';
function sendMessageMorning() {
    // 短信提醒
    axios.default.get(queryurl + querydate.morning).then(result => {
        logger.info('信息已发送');
        logger.info(result.data);
        logger.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    }).catch(err => {
        logger.error('信息发送失败');
        logger.error(err);
        logger.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    });
    // 邮件提醒(获取天气，获取每日一读)
    weather.getWeather(weather.shweatherurl).then(szweatherinfo => {
        weather.getWeather(weather.shweatherurl).then(shweatherinfo=> {
            let year = 2013 + Math.floor(Math.random() * 6);
            let month = ('00' + Math.ceil(Math.random() * 12)).slice(-2);
            let day = ('00' + Math.ceil(Math.random() * 28)).slice(-2);
            let date = `${year}-${month}-${day}`;
            axios.default.get('http://open.iciba.com/dsapi?date=' + date).then(result => {
                mail(`${szweatherinfo}\n\n${result.data.content} \n ${result.data.note}`, `${shweatherinfo}\n\n${result.data.content} \n ${result.data.note}`);
                logger.info('邮件已发送');
                logger.info(result.data.content);
                logger.info(result.data.note);
                logger.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            }).catch(err => {
                logger.error('邮件发送失败');
                logger.error(err);
                logger.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            });
        })
    })
}
function sendMessageEvening() {
    // 短信提醒
    axios.default.get(queryurl + querydate.evening).then(result => {
        logger.info('信息已发送');
        logger.info(result.data);
        logger.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    }).catch(err => {
        logger.error('信息发送失败');
        logger.error(err);
        logger.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    });
    // 邮件提醒(获取天气，获取每日一读)
    weather.getWeather(weather.shweatherurl).then(szweatherinfo => {
        weather.getWeather(weather.shweatherurl).then(shweatherinfo=> {
            let year = 2013 + Math.floor(Math.random() * 6);
            let month = ('00' + Math.ceil(Math.random() * 12)).slice(-2);
            let day = ('00' + Math.ceil(Math.random() * 28)).slice(-2);
            let date = `${year}-${month}-${day}`;
            axios.default.get('http://open.iciba.com/dsapi?date=' + date).then(result => {
                mail(`${szweatherinfo}\n\n${result.data.content} \n ${result.data.note}`, `${shweatherinfo}\n\n${result.data.content} \n ${result.data.note}`);
                logger.info('邮件已发送');
                logger.info(result.data.content);
                logger.info(result.data.note);
                logger.info('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            }).catch(err => {
                logger.error('邮件发送失败');
                logger.error(err);
                logger.error('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            });
        })
    })
}
// 早上问候
let timerule1 = new schedule.RecurrenceRule();
timerule1.dayOfWeek = [0, 3, 4, 5, 6];
timerule1.hour = [8];
timerule1.minute = [55];
let job1 = new schedule.scheduleJob(timerule1, sendMessageMorning);

// 晚上问候
let timerule2 = new schedule.RecurrenceRule();
timerule2.dayOfWeek = [0, 3, 4, 5, 6];
timerule2.hour = [18];
timerule2.minute = [5];
let job2 = new schedule.scheduleJob(timerule2, sendMessageEvening);