

 'use strict';
 /**
 * 开发环境配置文件
 */
 let config = {
     env: 'dev', //环境名称
     host:'127.0.0.1',
     port: 3000, //服务端口号
     mysql_config: {
         //mysql数据库配置
         host: 'localhost',
         user: 'root',
         port: '3306',
         database: 'hhq',
         password: 'h12345678',
         connectionLimit: 50 // 最大连接数
     },
     mongodb_config: {
         //mongodb数据库配置
     },
     redis_config: {
         //redis数据库配置
     },
 };
 module.exports = config;