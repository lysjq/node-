const querystring = require('querystring');
const axios = require('axios');
const logger = require('./logger');
const shenzhenweatherparam = querystring.stringify({
    cityname: '深圳',
    key: '077dbed41e9fb1bbaf3204f6d579373b'
});
const shhaiweatherparam = querystring.stringify({
    cityname: '上海',
    key: '077dbed41e9fb1bbaf3204f6d579373b'
});
const szweatherurl = 'http://v.juhe.cn/weather/index?' + shenzhenweatherparam;
const shweatherurl = 'http://v.juhe.cn/weather/index?' + shhaiweatherparam;
async function getWeather(weatherurl) {
    return axios.default.get(weatherurl).then(res => {
        if (res.data.resultcode == '200') {
            let data = res.data.result;
            let today = data.today;
            let city = today.city;
            let todayday = today.date_y;
            let todayweek = today.week;
            let temperature = today.temperature;
            let weather = today.weather;
            let dressing_advice = today.dressing_advice;
            let future = Object.keys(data.future);
            let tomoro = data.future[future[1]];
            let tomoroday = tomoro.week
            let tomototemperature = tomoro.temperature;
            let tomotoweather = tomoro.weather;
            let weatherInfo = `温馨天气提示,小松果请注意：(城市${city}):\n今天(${todayday}  ${todayweek}):\n气温：${temperature}\n天气:${weather}\n建议：${dressing_advice}\n\n明天(${tomoroday})天气猜测:\n气温：${tomototemperature}\n天气：${tomotoweather}`;
            logger.info('天气情况：' + weatherInfo);
            return Promise.resolve(weatherInfo);
        } else {
            logger.info('天气获取失败：');
            return Promise.resolve('');
        }
    }).catch(err => {
        return Promise.resolve('');
    });
}
module.exports = {
    getWeather,
    szweatherurl,
    shweatherurl,
}