/*
  sqlMessage: 'Client does not support authentication protocol requested by server; 
  consider upgrading MySQL client',
  在最新下载的MySql客户端版本使用的是caching_sha2_password加密方式，
  所以默认创建的root用户和密码都是这个加密方式。
  而npm包里的mysql模块还是使用原来的mysql_native_password加密方式，两者不互通，连接会报错。
  //解决方法 
  mysql -u root -p
  use mysql;
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'h12345678';
 */
/*
//
SQL关键点
修改主键自动增长
alter table hq_user modify id int(11) auto_increment;
 */
var mysql = require('mysql');
var dbPool = null;

const config = require('../config');
const mysql_config = config.mysql_config;
function initDB() {
 

    dbPool = mysql.createPool({
        connectionLimit: mysql_config.connectionLimit,
        host: mysql_config.host,
        user: mysql_config.user,
        password: mysql_config.password,
        database: mysql_config.database
    });
    if(dbPool){
        console.log('创建数据库池成功');
    }
}

function closeDB() {
    if (dbPool) {
        dbPool.end((err) => {
            if (err) throw err;
            //console.log('断开数据库连接成功');
        });
    }
}

function delete_data(sql, callback) {
    //删除
    _excute_sql(sql, [], callback);
}

function insert_data(sql, values, callback) {
    //插入
    _excute_sql(sql, values, callback);
}

function update_data(sql, values, callback) {
    //更新
    _excute_sql(sql, values, callback);
}

function query_data(sql, values, callback) {
    //查询
    _excute_sql(sql, values, callback);
}

function _excute_sql(sql, values, callback) {
    if (dbPool == null) {
        callback(0, []);
        return;
    }
    console.log('sql: ' + sql);


    dbPool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        connection.query(sql, values, function (error, results, fields) {
            // When done with the connection, release it.

            console.log('sql exe err:', error);
            if (error) {
                callback(0, []);
            } else {
                callback(1, results);
            }
            connection.release();
            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });


    
}

var server_db = {
    initDB,
    query_data,
    insert_data,
    delete_data,
    update_data,
    closeDB,
}

module.exports = server_db;