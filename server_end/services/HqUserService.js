var server_db = require('../db/server_db');
//处理form表单数据
var formidable = require('formidable')

const responseSuccess = {
    code: 0,
    message: 'ok',
    data:{
    }
}
const responseFail = {
    code: -1,
    message: 'error',
    data:{
    }
}

function defaultError(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    let rsp = responseFail;
    rsp.message = '操作失败';
    res.write(JSON.stringify(rsp));
    res.end();
}

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

function getAllUsers(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    const sql = 'select * from hq_user';
    server_db.query_data(sql,[], (state, results) => {
        if (state == 1) {
            let rsp = responseSuccess;
            rsp.message = '查询成功';
            rsp.data = results;
            const json = JSON.stringify(rsp);
            res.write(json);
            res.end();
        } else {
            let rsp = responseFail;
            rsp.message = '查询失败';
            const json = JSON.stringify(rsp);
            res.write(json);
            res.end();
        }
    });
}

function getUser(req, res) {
    let params = queryParamsToObj(req.url);   
    console.log('getUser:',params);
    try {
        const user = params;
        _getUser(user,res)
    } catch (error) {
        defaultError(req, res);
    }
}

function _getUser(user, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');

    let rsp = responseFail;
    if (user.userId == null || user.userId == '') {
        rsp.message = '用户不存在:' + user.name;
        res.end(JSON.stringify(rsp));
        return;
    }

    const sql = 'select * from hq_user where id = ?';
    server_db.query_data(sql,[parseInt(user.userId)], (state, results) => {
        if (state == 1) {
            let rsp = responseSuccess;
            rsp.message = '查询成功';
            rsp.data = results;
            const json = JSON.stringify(rsp);
            res.write(json);
            res.end();
        } else {
            let rsp = responseFail;
            rsp.message = '查询失败';
            const json = JSON.stringify(rsp);
            res.write(json);
            res.end();
        }
    });
}

function addUser(req, res) {
    let data = '';
    req.on('data',(chunk)=>{
        data += chunk;
    });
    req.on('end',()=>{
        console.log('adduser:',data);
        try {
            const user = JSON.parse(data);
            console.log();
            _addUser(res,user)
        } catch (error) {
            defaultError(req, res);
        }
    })

    /*
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log('addUser:',fields);
            defaultError(req, res);
        } else {
            _addUser(res, fields);
        }
    });
    */
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
            let rsp = responseSuccess;
            rsp.message = '添加用户成功';
            rsp.data = user;
            res.write(JSON.stringify(rsp));
            res.end();
        } else {

            let rsp = responseFail;
            rsp.message = '添加失败';
            const json = JSON.stringify(rsp);
            res.write(json);
            res.end();
        }
    });
}

function deleteUser(req, res) {
    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //     if (err) {
    //         defaultError(req, res);
    //     } else {
    //         _deleteUser(res, fields);
    //     }
    // });

    let data = '';
    req.on('data',(chunk)=>{
        data += chunk;
    });
    req.on('end',()=>{
        console.log('deleteUser:',data);
        try {
            const user = JSON.parse(data);
            console.log();
            _deleteUser(user,res)
        } catch (error) {
            defaultError(req, res);
        }
    })
}

function _deleteUser(user,res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    let rsp = responseFail;
    if (user.userId == null || user.userId == '') {
        rsp.message = '删除失败:name:' + user.name;
        res.end(JSON.stringify(rsp));
        return;
    }
    const sql = 'delete from hq_user where id = ' + parseInt(user.userId);
    server_db.delete_data(sql, (state, result) => {
        if (state == 1) {
            rsp = responseSuccess;
            rsp.message = '删除用户成功';
            res.end(JSON.stringify(rsp));
        } else {
            rsp = responseFail;
            rsp.message = '删除失败';
            res.end(JSON.stringify(rsp));
        }
    });
}



function updateUser(req, res) {

    let data = '';
    req.on('data',(chunk)=>{
        data += chunk;
    });
    req.on('end',()=>{
        console.log('updateUser:',data);
        try {
            const user = JSON.parse(data);
            console.log();
            _updateUser(res,user)
        } catch (error) {
            defaultError(req, res);
        }
    })

    // var form = new formidable.IncomingForm();
    // form.parse(req, function(err, fields, files) {
    //     if (err) {
    //         defaultError(req, res);
    //     } else {
    //         _updateUser(res, fields);
    //     }
    // });
}

function _updateUser(res, user) {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    let rsp = responseFail;

    if (user.userId == null || user.userId == '') {
        rsp.message = '更新失败:name:' + user.name;
        res.end(JSON.stringify(rsp));
        return;
    }
    if (user.name == null || user.name == '') {
        rsp.message = '更新失败:name:' + user.name;
        res.end(JSON.stringify(rsp));
        return;
    }
    const sql = `update hq_user set name = ?  where id =  ?`;
    server_db.update_data(sql,[user.name,parseInt(user.userId)], (state, result) => {
        if (state == 1) {
            rsp = responseSuccess;
            rsp.message = '更新用户成功';
            rsp.data = user;
            res.end(JSON.stringify(rsp));
        } else {
            rsp = responseFail;
            rsp.message = '更新失败'
            res.end(JSON.stringify(rsp));
        }
    });
}
var HqUserService = {
    server_db,
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
};
module.exports = HqUserService;