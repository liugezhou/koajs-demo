const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
// 获取GET请求有两个途径：ctx.query或者ctx.request.query
app.use(async (ctx) => {
    if (ctx.url === '/' && ctx.method === 'GET') {
        const html = await render()
        ctx.body = html
    }
    if (ctx.url === '/' && ctx.method === 'POST') {
        const postData = await parsepostData(ctx)
        ctx.body = postData
    }
})

function parsepostData(ctx){
    return new Promise((resolve,reject) => {
        try {
           let postData = ''
           ctx.req.addListener('data',(data) => {
               postData += data
           }) 
          ctx.req.addListener('end',()=>{
            const res = parseQueryStr(postData)
           resolve(res)
          })
           
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

function parseQueryStr(data){
    const arr = data.split('&')
    let result = {};
    arr.forEach(element => {
        let str = element.split('=');
        result[str[0]] = decodeURIComponent(str[1])
    });
    return result;
}
function render(){
    return new Promise((resolve,reject) =>{
        let viewUrl = path.join(__dirname,'./demo.html')
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