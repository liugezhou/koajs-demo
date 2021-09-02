const Koa = require('koa');
const app = new Koa();
const query = require('./query')

app.use(async (ctx) =>{
    const sql = 'select * from version';
    const dataList = await  query(sql)
    ctx.body = dataList
})

app.listen(3000)