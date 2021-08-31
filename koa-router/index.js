const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

let home = new Router();
home.get('/', async (ctx) => {
    let html = ` <ul>
    <li><a href="/page/helloworld">/page/helloworld</a></li>
    <li><a href="/page/404">/page/404</a></li>
  </ul>`
    ctx.body = html;
})

let page = new Router();
page.get('/404', async(ctx) => {
    ctx.body = '404 Page!'
}).get('/helloworld',async (ctx) =>{
    ctx.body ='helloworld'
})

let router = new Router()
router.use('/',home.routes(),home.allowedMethods())
router.use('/page',page.routes(),page.allowedMethods)

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('koa-router: http://localhost:3000')
})