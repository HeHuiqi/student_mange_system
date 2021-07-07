const http = require('http')


const hostname = '127.0.0.1'
const port = 3000

var HqUserService = require('./services/HqUserService');
var server_db = HqUserService.server_db;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    dealRouter(req, res);
})
server.listen(port, hostname, (error) => {
    server_db.initDB();
    console.log(`服务器运行在 http://${hostname}:${port}/`)
});
server_db.closeDB();

function dealRouter(req, res) {
    console.log(req.method + ' ' + req.url);
    const url = req.url;
    if (url == '/') {
        homePage(req, res);
        return;
    }
    if (url == '/users') {
        HqUserService.getAllUsers(req, res);
        return;
    }
    if (url == '/adduser') {
        HqUserService.addUser(req, res);
        return;
    }
    if (url == '/deleteuser') {
        HqUserService.deleteUser(req, res);
        return;
    }
    if (url == '/updateuser') {
        HqUserService.updateUser(req, res);
        return;
    }
    notFound(req, res);
}

function homePage(_, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    const home = 'Welcom to China!';
    res.write(home);
    res.end();
}

function notFound(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.write('<h1>404 Not Found<h1>');
    res.end();
}