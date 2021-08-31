const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const app = new Koa();

app.use(async (ctx) => {
    let fullStaticPath = path.join(__dirname, './static');
    let _content = await content(ctx, fullStaticPath);
    ctx.body = _content
})

async function content(ctx, fullStaticPath) {
    // 拼出请求全路径
    const reqPath = path.join(fullStaticPath, ctx.url)
    // 判断这个路径是否存在
    const exists = fs.existsSync(reqPath)
    let content = ''
    if (!exists) {
        content = '404 NOT Found'
    } else {
        let stat = fs.statSync(reqPath)
        if (stat.isDirectory()) {
            // 如果为目录，则读取目录内容，以html格式返回
            content = readDirectoryContent(ctx.url, reqPath)
        } else {
            // 如果为文件，则读取文件内容
            content = await readFile(reqPath)
        }
    }
    return content
}

function readDirectoryContent(url, dirPath) {
    // 读取dirPath下的所有文件和文件夹，按照文件夹+文件的形式拼接起来
    const files = fs.readdirSync(dirPath)
    let dirList = [], fileList = [];
    for (let i = 0; i < files.length; i++){
        let items = files[i];
        let itemArr = items.split('\.');
        if(itemArr.length >1){
            fileList.push(files[i])
        }else{
            dirList.push(files[i])
        }
    }
    let contentList = dirList.concat(fileList);
    let html =`<ul>`;
    for(let i =0;i<contentList.length;i++){
        console.log(html)
        html = `${html}<li><a href ="${url === '/'?'': url}/${contentList[i]}">${contentList[i]}</a></li>`
    }
    html = `${html}</ul>`
    return html;
}
async function readFile(filePath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filePath,'binary',(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}
app.listen(3000)
console.log('GET:http://localhost:3000')