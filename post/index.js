const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
// 获取GET请求有两个途径：ctx.query或者ctx.request.query
app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        const html = await render()
        ctx.body = html
    }
})

function render(){
    return new Promise((resolve,reject) =>{
        let viewUrl = `../post/demo.html`
        fs.readFile(viewUrl, "binary", ( err, data ) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( data )
            }
        })
    })
}

app.listen(3000)
console.log('GET: http://localhost:3000')