function deleteTableTr(userId) {
    const table = document.getElementById('resp_result_table');
    let atr = `[lable=user_${userId}]`
    const tr = table.querySelector(atr);
    console.log(tr);
    table.removeChild(tr);
}

function deleteTableAllTr(callback) {
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