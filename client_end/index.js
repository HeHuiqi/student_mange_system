const host = 'http://localhost:3000';

function initHomePage() {
    var link = document.getElementById('home_page');
    link.setAttribute('href', host);
}
initHomePage();

function addEvents() {
    var btn = document.getElementById('query_btn');
    btn.addEventListener('click', () => {
        deleteTableAllTr(() => {
            queryAllUsers();
        });
    });
}
addEvents();

// 转化input标签的值为查询参数
function formatFormData(inputs) {
    let formatDatas = [];
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        const formData = input.name + '=' + input.value;
        formatDatas.push(formData);
    }
    console.log(formatDatas);

    return formatDatas.join('&');
}
// 转化input标签的值为obj
function formatFormToJson(inputs) {
    let formatJson = {};
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        formatJson[input.name] = input.value;
    }
    console.log(formatJson);
    return formatJson;
}

function addFormEvent() {
    let form = document.getElementById('add_user');
    let btn = form.querySelectorAll('input[type=button]')[0];
    btn.addEventListener('click', () => {
        console.log('add_user');
        try {

            let inputs = form.querySelectorAll('input[type=text]')
            let data = formatFormToJson(inputs);
            console.log('form1data:',);
            addUser(JSON.stringify(data));

        } catch (error) {

        }


    });

    let form2 = document.getElementById('delete_user');
    let btn2 = form2.querySelectorAll('input[type=button]')[0];
    btn2.addEventListener('click', () => {
        console.log('delete_user');
        try {
            let inputs = form2.querySelectorAll('input[type=text]');
            let data = formatFormToJson(inputs);
            console.log('form2data:', data);
            deleteUser(user);
        } catch (error) {

        }

    })


    let form3 = document.getElementById('update_user');
    let btn3 = form3.querySelectorAll('input[type=button]')[0];
    btn3.addEventListener('click', () => {
        console.log('update_user');
        try {
            let inputs = form3.querySelectorAll('input[type=text]');
            let user = formatFormToJson(inputs);
            console.log('form3data:', user);
            updateUser(user);

        } catch (error) {

        }
    })

    let form4 = document.getElementById('query_user');
    let btn4 = form4.querySelectorAll('input[type=button]')[0];
    btn4.addEventListener('click', () => {
        console.log('query_user');
        try {
            let inputs = form4.querySelectorAll('input[type=text]');
            let user = formatFormData(inputs);
            console.log('form3data:', user);
            queryUser(user);

        } catch (error) {

        }
    })


    // let form = document.getElementById('add_user');
    // form.setAttribute('action', host + '/adduser');
    // form.setAttribute('method', 'POST');

    // form = document.getElementById('delete_user');
    // form.setAttribute('action', host + '/deleteuser');
    // form.setAttribute('method', 'POST');

    // form = document.getElementById('update_user');
    // form.setAttribute('action', host + '/updateuser');
    // form.setAttribute('method', 'POST');

}
addFormEvent();

// 删除所有数据dom
function deleteTableAllTr(callback) {
    const row_class = 'table_user_row';
    const table = document.getElementById('resp_result_table');
    const userRows = document.getElementsByClassName(row_class);
    //这里不能直接遍历userRows，userRows为HTMLCollection对象，在进行删除removeChild()时
    //userRows.length的长度时变化的，不能进行正常的遍历，所有要先用数组保存一下这些元素
    const rows = Array.from(userRows);
    // console.log(rows);
    rows.forEach(row => {
        table.removeChild(row);
    });
    callback();
}
// 删除某一行
function deleteTableTr(userId) {
    const table = document.getElementById('resp_result_table');
    let atr = `[lable=user_${userId}]`
    const tr = table.querySelector(atr);
    console.log(tr);
    table.removeChild(tr);

}

// 插入某一行
function insertTableRow(userid, name, address) {
    var tr_class = 'table_user_row';
    var tr = document.createElement('tr');
    tr.className = tr_class;
    tr.setAttribute('lable', 'user_' + userid);

    var id_td = document.createElement('td');
    id_td.setAttribute('lable', 'userId')
    id_td.innerHTML = userid;

    var name_td = document.createElement('td');
    name_td.setAttribute('lable', 'name')
    name_td.innerHTML = name;

    var address_td = document.createElement('td');
    address_td.setAttribute('lable', 'address')
    address_td.innerHTML = address;

    tr.appendChild(id_td);
    tr.appendChild(name_td);
    tr.appendChild(address_td);
    var table = document.getElementById('resp_result_table');
    table.appendChild(tr);
}

// 更新某一个数据
function updateTableRow(user) {
    const table = document.getElementById('resp_result_table');
    let atr = `[lable=user_${user.userId}]`
    const tr = table.querySelector(atr);
    const nameTd = tr.querySelector('[lable=name]');
    console.log(tr);
    nameTd.innerHTML = user.name;
}

// 基础请求
function startRequest(method, url, params, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        let jsonstr = '';
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            jsonstr = xmlhttp.responseText;
            callback(jsonstr);
        }
    }

    //注意这里要在服务端设置响应头 res.setHeader('Access-Control-Allow-Origin', '*');
    //允许跨域请求
    if (method === 'GET' && params) {
        url = url + '?' + params;
    }
    xmlhttp.open(method, url, true);
    xmlhttp.send(params);
}

function addUser(params) {
    startRequest('POST', `${host}/adduser`, params, (rsp) => {
        console.log('addUser:',rsp);
        try {
            const result = JSON.parse(rsp);
            if (result.code === 0) {
            }

        } catch (error) {

        }

    });
}

function deleteUser(user) {
    startRequest('POST', `${host}/deleteuser`, JSON.stringify(user), (rsp) => {
        console.log('deleteUser',rsp);
        try {
            const result = JSON.parse(rsp);
            if (result.code === 0) {
                console.log(result);
                deleteTableTr(user.userId);
            }
        } catch (error) {

        }

    });
}
function updateUser(user) {
    startRequest('POST', `${host}/updateuser`, JSON.stringify(user), (rsp) => {
        console.log('updateUser:', rsp);
        try {
            const result = JSON.parse(rsp);
            if (result.code === 0) {
                console.log(result);
                updateTableRow(user);
            }
        } catch (error) {

        }
    });
}
function queryUser(params) {
    startRequest('GET', `${host}/user`, params, (rsp) => {
        document.getElementById("query_result").innerHTML = rsp;
        console.log('queryUser',rsp);
        try {
            const result = JSON.parse(rsp);
            if (result.code === 0) {
                deleteTableAllTr(() => {
                    result.data.forEach(user => {
                        insertTableRow(user.id, user.name, user.address);
                    });
                });

            }
        } catch (error) {

        }

    });
}
function queryAllUsers() {
    startRequest('GET', `${host}/users`, null, (rsp) => {
        console.log('queryAllUsers:',rsp);
      try {

        document.getElementById("query_result").innerHTML = rsp;
        const result = JSON.parse(rsp);
        if (result.code === 0) {
            result.data.forEach(user => {
                insertTableRow(user.id, user.name, user.address);
            });
        }
      } catch (error) {
          
      }
    });
}
queryAllUsers();