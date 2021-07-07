const host = 'http://localhost:3000';

function initHomePage() {
    var link = document.getElementById('home_page');
    link.setAttribute('href', host);
}
initHomePage();

function addEvents() {
    var btn = document.getElementById('query_btn');
    btn.addEventListener('click', (target) => {
        deleteTableTr(() => {
            queryAllUsers();
        });
    });
}
addEvents();

function initFormAction() {
    var form = document.getElementById('add_user');
    form.setAttribute('action', host + '/adduser');
    form.setAttribute('method', 'POST');

    form = document.getElementById('delete_user');
    form.setAttribute('action', host + '/deleteuser');
    form.setAttribute('method', 'POST');

    form = document.getElementById('update_user');
    form.setAttribute('action', host + '/updateuser');
    form.setAttribute('method', 'POST');

}
initFormAction();

function deleteTableTr1(callback) {
    const tr_class = 'table_user_row';
    const table = document.getElementById('resp_result_table');
    const rows = document.getElementsByClassName(tr_class);
    for (var index = 0; index < rows.length; index++) {
        const row = rows[index];
        console.log('index:' + index);
        console.log('rows.length:' + rows.length);
        if (row) {
            table.removeChild(row);
        }
    }
    callback();
}

function deleteTableTr(callback) {
    const row_class = 'table_user_row';
    const table = document.getElementById('resp_result_table');
    const userRows = document.getElementsByClassName(row_class);
    //这里不能直接遍历userRows，userRows为HTMLCollection对象，在进行删除removeChild()时
    //userRows.length的长度时变化的，不能进行正常的遍历，所有要先用数组保存一下这些元素
    const rows = Array.from(userRows);
    console.log(rows);
    rows.forEach(row => {
        table.removeChild(row);
    });
    callback();
}

function insertTableRow(userid, name, address) {
    var tr_class = 'table_user_row';
    var tr = document.createElement('tr');
    tr.className = tr_class;
    var id_td = document.createElement('td');
    id_td.innerHTML = userid;
    var name_td = document.createElement('td');
    name_td.innerHTML = name;
    var address_td = document.createElement('td');
    address_td.innerHTML = address;
    tr.appendChild(id_td);
    tr.appendChild(name_td);
    tr.appendChild(address_td);
    var table = document.getElementById('resp_result_table');
    table.appendChild(tr);
}

function queryAllUsers() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonstr = xmlhttp.responseText;
            document.getElementById("query_result").innerHTML = jsonstr;
            var users = JSON.parse(jsonstr)
            users.forEach(user => {
                insertTableRow(user.id, user.name, user.address);
            });
        }
    }

    //注意这里要在服务端设置响应头 res.setHeader('Access-Control-Allow-Origin', '*');
    //允许跨域请求
    xmlhttp.open("GET", `${host}/users`, true);
    xmlhttp.send();
}
queryAllUsers();