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
var db = null;

function initDB() {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'h12345678',
        database: 'hhq'
    });
    //连接数据库
    db.connect((err) => {
        if (err) throw err;
        // console.log('数据库连接成功。。。');
    });
}

function closeDB() {
    if (db) {
        db.end((err) => {
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

function update_data(sql, callback) {
    //更新
    _excute_sql(sql, [], callback);
}

function query_data(sql, callback) {
    //查询
    _excute_sql(sql, [], callback);
}

function _excute_sql(sql, values, callback) {
    if (db == null) {
        callback(0, []);
        return;
    }
    console.log('sql: ' + sql);
    db.query(sql, values, (err, results, fields) => {
        if (err) {
            callback(0, []);
        } else {
            callback(1, results);
        }
    });
}
/*
function test() {

    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'h12345678',
        database: 'hhq'
    });
    con.connect((err) => {
        if (err) throw err;
        console.log('连接成功。。。');
    });
    //插入
    const insert_values = [2, '奇哥', 1, 18, '上海'];
    const insert_sql = 'insert into hq_user (id,name,sex,age,address) values (?,?,?,?,?)';
    con.query(insert_sql, insert_values, (err, results, fields) => {
        if (err) throw err;
        console.log('插入数据成功');
    });

    con.query('select * from hq_user', function(error, results, fields) {
        if (error) throw error;
        console.log('The results is: ', results);
    });

    con.end((err) => {
        if (err) throw err;
        console.log('断开连接成功');
    });
}
*/
var server_db = {
    initDB,
    query_data,
    insert_data,
    delete_data,
    update_data,
    closeDB,
}

module.exports = server_db;