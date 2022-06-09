const path = require('path')

console.log(`运行环境${process.env.NODE_ENV}`)

let env = process.env.NODE_ENV || 'prod'
env = env.toLowerCase()

// 载入配置文件
const file = path.resolve(__dirname,env)
let config = {};
try{
    config = require(file)
    // console.log('Load config: [%s] %s', env, file);
}catch (err) {
    console.error('Cannot load config: [%s] %s', env, file);
    throw err;
}

module.exports = config;