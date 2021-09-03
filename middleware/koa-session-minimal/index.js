const Koa = require('koa');
const koaSessionMinimal = require('koa-session-minimal');
const koaMysqlSession = require('koa-mysql-session');

const app = new Koa();
let store = new koaMysqlSession({
    user:'root',
    password:'******',
    database:'koa-session',
    host:'127.0.0.1'
})
// 存放sessionId的cookie配置
let cookie = {
    maxAge: '', // cookie有效时长
    expires: '',  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
  
}
app.use(koaSessionMinimal({
    key:'SEESIONID',
    store,
    cookie
}))

app.use(async (ctx)=>{
    // 设置session
    if(ctx.url === '/set'){
        ctx.session = {
            user_id:Math.random().toString(36).substr(2),
            count:0
        }
        ctx.body = ctx.session
    } else if(ctx.url === '/') {
        //读取session信息
        ctx.body = ctx.session
    }
})

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
})