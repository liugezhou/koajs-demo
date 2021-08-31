const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const app = new Koa();

app.use(bodyParser())

app.use(async (ctx) => {
    if(ctx.url ==='/' && ctx.method === 'GET'){
        let html = await readHtml()
        ctx.body = html
    }
    if(ctx.url ==='/' &&ctx.method === 'POST'){
        let params = ctx.request.body
        ctx.body = params
    }
})

function readHtml() {
    console.log('?')
    return new Promise((resolve,reject)=>{
        let indexPath = path.join(__dirname,'../post/demo.html');
        fs.readFile(indexPath,'binary', ( err, data ) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( data )
            }
        })
    })
}
app.listen(3000,()=>{
    console.log('GET: http://localhost:3000')
})