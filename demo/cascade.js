const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  console.log(1)
  await next();
  console.log(5)
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.header} - ${ctx.method}  - ${ctx.origin} - ${rt}`);  
});

// x-response-time

app.use(async (ctx, next) => {
    console.log(2)
  const start = Date.now();
  await next();
  console.log(4)
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
    console.log(3)
    console.log(ctx.type)
  ctx.body =`Hello World`;
});

app.listen(3000,function(){
    console.log('Server running on  htttp://localhost:3000')
})