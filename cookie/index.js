const Koa = require('koa');
const app = new Koa();

app.use(async (ctx)=>{
    if(ctx.url === '/index'){
        ctx.cookies.set('cid','koa cookie is ok',{
            domain:'localhost',
            path:'/index',
            maxAge:60 * 1000,
            expires:new Date('2022-09-02'),
            httpOnly:false,
            overwrite:false
        })
        ctx.body ='cookie is ok'
    }else{
        ctx.body = '404 Not Found'
    }
})

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
  })