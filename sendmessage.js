const querystring = require('querystring');
// 此设置需要自己到聚合获取
const morning = querystring.stringify({
    "mobile": "15802121518",
    "tpl_id": "164938",
    "tpl_value": "",
    "key": xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx, //聚合接口上自己的appkey值
});
const evening = querystring.stringify({
    "mobile": "15802121518",
    "tpl_id": "164940",
    "tpl_value": "",
    "key": xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx,
});
const querydate = {
    morning,
    evening,
}
module.exports = querydate;
