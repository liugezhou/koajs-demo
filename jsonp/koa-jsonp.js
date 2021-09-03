const koaJsonp = require('koa-jsonp');
const Koa = require('koa');
const app = new Koa();

// 使用中间件
app.use(koaJsonp())

app.use(async (ctx) => {
    let returnData = {
        success: true,
        data:{
            text:'this is a jsonp api',
            time: new Date().getTime()
        }
    }
    ctx.body = returnData
})

app.listen(3000, () => {
    console.log('[demo] jsonp is starting at port 3000')
})