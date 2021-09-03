const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    if(ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp'){
        let callbackName = ctx.query.callback || 'callback';
        let returnData = {
            success: true,
            data:{
                text:'this is a jsonp api',
                time: new Date().getTime()
            }
        }
        let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`
        ctx.type = 'text/javascript';
        ctx.body = jsonpStr
    }else{
        ctx.body ='hello jsonp'
    }
})

app.listen(3000)