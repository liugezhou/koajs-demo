const Koa = require('koa');
const app = new Koa();
const fs = require('fs')

app.use(async (ctx) => {
    const url = ctx.request.url
    const data = await route(url)
    ctx.body = data
})

async function route(url){
    let view = '404.html'
    switch (url) {
        case "/":
            view = 'index.html'
            break;
        case "/index":
            view = 'index.html'
            break;
        case "/todo":
            view = 'todo.html'
            break;
        default:
            view = '404.html'
            break;
    }
    const data = await render(view)
    return data
}

function render(page){
    return new Promise((resolve,reject) =>{
        let viewUrl = `./view/${page}`
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
console.log('http://localhost:3000')