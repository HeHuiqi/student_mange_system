var server_db = require('../db/server_db');
//处理form表单数据
var formidable = require('formidable')

function defaultError(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.write('操作失败');
    res.end();
}

function getAllUsers(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    const sql = 'select * from hq_user';
    server_db.query_data(sql, (state, results) => {
        if (state == 1) {
            var json = JSON.stringify(results);
            res.write(json);
            res.end();
        } else {
            res.end('查询失败');
        }
    });
}

function addUser(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            defaultError(req, res);
        } else {
            _addUser(res, fields);
        }
    });
}

function _addUser(res, user) {
    res.statusCode = 200;
    console.log('name:' + user.name);
    console.log('sex:' + user.sex);

    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (user.name == null) {
        res.end('插入失败:name:' + user.name);
        return;
    }
    const sql = 'insert into  hq_user (name,sex,age,address) values (?,?,?,?)';
    var sex = user.sex == '' ? 0 : parseInt(user.sex);
    var age = user.age == '' ? 0 : parseInt(user.age);

    const values = [user.name, sex, age, user.address];
    console.log(values);

    server_db.insert_data(sql, values, (state, result) => {
        if (state == 1) {
            res.end('添加用户成功');
        } else {
            res.end('添加失败');
        }
    });
}

function deleteUser(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            defaultError(req, res);
        } else {
            _deleteUser(res, fields);
        }
    });
}

function _deleteUser(res, user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (user.user_id == null || user.user_id == '') {
        res.end('删除失败:name:' + user.name);
        return;
    }
    const sql = 'delete from hq_user where id = ' + parseInt(user.user_id);
    server_db.delete_data(sql, (state, result) => {
        if (state == 1) {
            res.end('删除用户成功');
        } else {
            res.end('删除失败');
        }
    });
}



function updateUser(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            defaultError(req, res);
        } else {
            _updateUser(res, fields);
        }
    });
}

function _updateUser(res, user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (user.user_id == null || user.user_id == '') {
        res.end('更新失败:name:' + user.name);
        return;
    }
    if (user.name == null || user.name == '') {
        res.end('更新失败:name:' + user.name);
        return;
    }
    const sql = `update hq_user set name = '${user.name}'  where id =  ${parseInt(user.user_id)}`;
    server_db.update_data(sql, (state, result) => {
        if (state == 1) {
            res.end('更新用户成功');
        } else {
            res.end('更新失败');
        }
    });
}
var HqUserService = {
    server_db,
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
};
module.exports = HqUserService;