const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123321',
    database: 'first_sql'
})
connection.connect();

function query($sql) {
    return new Promise((resolve) => {
        connection.query($sql, (err, result) => {
            resolve(result)
        })
    })
}
// app.use(async (ctx, next) => {
//     // console.log('middle1')
//     ctx.body = "Hello World";
//     next()
// })
app.use(async (ctx, next) => {
    //设置响应头
    ctx.set('content-type', 'text/html')

    if (ctx.url == '/') {
        let content = fs.readFileSync('./index.html', 'utf-8');
        ctx.body = content;
    } else if (ctx.request.url == '/index') {
        let $sql = await query(`select * from 1703a`);
        ctx.body = {
            code: 1,
            msg: 'path /index success',
            $sql
        }
    } else if (ctx.request.url == '/add') {
        let name = 'kitty', age = 1;
        let $sql = await query(`insert into 1703a (name,age) values ('${name}','${age}')`);
        ctx.body = {
            code: 1,
            msg: 'path /add success',
            $sql
        }
    }

})
app.listen(8080, () => {
    console.log("server is running at port 8080")
})