const Koa = require('koa');
const app = new Koa();
// 获取GET请求有两个途径：ctx.query或者ctx.request.query
app.use(async (ctx) => {
    const url = ctx.request.url;
    const params = ctx.request.query
    ctx.body = {
        url,
        params
    }
})

app.listen(3000, () => {
    console.log('GET: http://localhost:3000')
})