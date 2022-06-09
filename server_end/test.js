//需要安装dotenv依赖，并配置后才可以访问
// const dotenv = require("dotenv");
// dotenv.config({path:'./configs/.env.dev'});

// const host = process.env.NODE_ENV;
// console.log(host);

const config = require('./config');
// console.log(config);

let url = '/user?userId=5'
// url = '/user'

// url = url.split('?');

console.log(url);

function queryParamsToObj(url) {
    let query = url.split('?');
    let params = {};
    if (query.length > 1) {
        query = query[1];
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            params[pair[0]] = pair[1];
        }
        return params;
    }
    return null;
}
console.log(queryParamsToObj(url));
