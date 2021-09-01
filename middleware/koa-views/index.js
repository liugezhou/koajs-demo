const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname),{
    extension:'ejs'
}))

app.use(async (ctx) => {
    const title = 'koa is cool ma?';
    const username = 'liugezhou';
    const password = '88888';
    await ctx.render('view',{
        title,
        username,
        password
    })
})
app.listen(3000)