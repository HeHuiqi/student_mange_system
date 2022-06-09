const http = require('http')
const config = require('./config')

const hostname = config.host;
const port = config.port;

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
    let url = req.url;
    url = url.split('?')[0]
    if (url == '/') {
        homePage(req, res);
        return;
    }
    if (url == '/users') {
        HqUserService.getAllUsers(req, res);
        return;
    }
    if (url == '/user') {
        HqUserService.getUser(req, res);
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