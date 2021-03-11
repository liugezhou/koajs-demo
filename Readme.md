# Koa
---
> 基于Node.js平台的下一代web开发框架

# 简介
---
> Koa是一个新的web框架，由Express幕后的原班人马打造，致力与成为web应用的和API开发领域中的一个更小、更富有表现力、更健壮的基石。 
> 通过 async函数，Koa帮你丢弃回调函数，并有力地增强错误处理。Koa并没有捆绑任何中间件，而是提供了一套优雅的方法，帮助您快速2⃣️愉快地编写服务端应用程序。

# 安装
---
> Koa依赖 node v7.6.0 或ES2015及更高版本和saync方法支持。   npm i koa

# 应用程序
---
> Koa应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。Koa类似于你可能遇到过的许多其他中间件系统，例如Ruby的Rack，Connect等，然而，一个关键的设计点是在其低级中间件层中提供高级“语法糖”。这提高了互操作性、稳健性，并使书写中间件更加愉快。

> 这包括诸如内容协商、缓存清理，代理支持和重定向等常见任务的写法。尽管提供了相当多的有用的方法，Koa仍保持了一个很小的体积，因为没有捆绑中间件。 
> 必修的hello world 应用（demo/hello-word.js）：

``` 
const Koa = require('koa');
const app = new Koa();

app.use(async ctx=>{
    ctx.body = 'hello world'
})

app.listen(3000)
```

## 级联
>  Koa 中间件以更传统的方式级联，您可能习惯使用类似的工具 - 之前难以让用户友好地使用 node 的回调。然而，使用 async 功能，我们可以实现 “真实” 的中间件。对比 Connect 的实现，通过一系列功能直接传递控制，直到一个返回，Koa 调用“下游”，然后控制流回“上游”。  

> 下面以 “Hello World” 的响应作为示例，当请求开始时首先请求流通过 x-response-time 和 logging 中间件，然后继续移交控制给 response 中间件。当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。当在下游没有更多的中间件执行后，堆栈将展开并且每个中间件恢复执行其上游行为。

> 代码演示：demo/cascade.js, 执行该文件，日志打印：1 2 3 4 5 以及耗时。

## 设置 --[理解不深]
> 应用程序设置是app实例上的属性，目前支持如下： 
> + app.env:默认是NODE_ENV或‘development’    
> + app.keys:签名的Cookie密钥数组
> + app.proxy:当真正的代理头字段被信任时    
> + 忽略 .subdomains 的 app.subdomainOffset 偏移量，默认为 2    
> + app.proxyIpHeader 代理 ip 消息头, 默认为 X-Forwarded-For    
> + app.maxIpsCount 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

## app.listen()
> 这里的app.listen(3000) 只是 下面代码的语法糖 

```
const http = require('http')
const Koa = require('Koa')
const app = new Koa()
http.createServer(app.callback()).listen(3000)
```
> 这意味着我们可以将应用程序同时作为 HTTP和HTTPS 或者多个地址。

## app.use(function)
> 将给定的中间件方法添加到此应用程序。app.use() 返回 this, 因此可以链式表达.

```
app.use(someMiddleware)
app.use(someOtherMiddleware)
app.listen(3000)
// 等同于
app.use(someMiddleware)
    .use(someOtherMiddleware)
    .listen(3000)
```

## app.keys --[理解不深]
> 设置签名的Cookie密钥。
> 这些被传递给KeyGrip，但是你也可以传递自己的KeyGrip实例。  
> 例如，以下是可以接受的：  
```
app.keys = ['key1','key2']
app.keys = new KeyGrip(['key1','key2'],'sha256')    
```
> 这些密钥可以倒换，并在使用{signed:true}参数签名Cookie时使用。 
```
    ctx.cookies.set('name','tobi',{signed:true})
```

## app.context
> app.context 是从其创建 ctx 的原型。您可以通过编辑 app.context 为 ctx 添加其他属性。这对于将 ctx 添加到整个应用程序中使用的属性或方法非常有用，这可能会更加有效（不需要中间件）和/或 更简单（更少的 require()），而更多地依赖于ctx，这可以被认为是一种反模式。

> 例如，要从 ctx 添加对数据库的引用：
```
app.context.db = db();
app.use(async ctx => {
    console.log(ctx.db)
})
```

## 错误处理
> 默认情况下，将所有错误输出到 stderr，除非 app.silent 为 true。 当 err.status 是 404 或 err.expose 是 true 时默认错误处理程序也不会输出错误。 要执行自定义错误处理逻辑，如集中式日志记录，您可以添加一个 “error” 事件侦听器：
```
app.on('error', err=>{
    log.error('server err:',err)
})
```
> 如果 req/res 期间出现错误，并且 _无法_ 响应客户端，Context实例仍然被传递：
```
app.on('error', (err,ctx)=>{
    log.error('server err:',err,ctx)
})
```
> 当发生错误 _并且_ 仍然可以响应客户端时，也没有数据被写入 socket 中，Koa 将用一个 500 “内部服务器错误” 进行适当的响应。在任一情况下，为了记录目的，都会发出应用级 “错误”。

# 上下文(Context)
---
> Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。    

> _每个_ 请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符，如以下代码片段所示：
```
app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
```
> 为方便起见许多上下文的访问器和方法直接委托给它们的 ctx.request或 ctx.response ，不然的话它们是相同的。 例如 ctx.type 和 ctx.length 委托给 response 对象，ctx.path 和 ctx.method 委托给 request。

## API
> + ctx.req:    Node的request对象   
> + ctx.res:    Node的response对象  
> + ctx.request:    Koa的request对象    
> + ctx.response:   Koa的response对象   
> + ctx.state:  推荐的命名空间，用于通过中间件传递信息和你的视图。 ctx.state.user = await User.find(id)     
>
> + ctx.app :   应用程序实例引用        
> + ctx.app.emit:   Koa 应用扩展了内部 EventEmitter。ctx.app.emit 发出一个类型由第一个参数定义的事件。对于每个事件，您可以连接 "listeners"，这是在发出事件时调用的函数.     
> + ctx.cookies.get(name,[options]): 通过 options 获取 cookie name,Koa使用cookies模块，其中只需传达参数     
> + ctx.cookies.set(name, value, [options]):通过 options 设置 cookie name 的 value      
> + ctx.throw([status], [msg], [properties])    
> + ctx.assert(value, [status], [msg], [properties])    
> + ctx.respond:为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false;。 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。请注意，Koa _不_ 支持使用此功能。这可能会破坏 Koa 中间件和 Koa 本身的预期功能。使用这个属性被认为是一个 hack，只是便于那些希望在 Koa 中使用传统的 fn(req, res) 功能和中间件的人。

# Request
---
> Koa request对象是在node的原生请求对象上的抽象，提供了诸多对HTTP服务器开发有用的功能。

## APi
> + request.header: 请求头对象  
> + request.header = : 设置请求头对象   
> + request.method: 请求方法    
> + request.url: 获取请求 URL.
> + request.origin: 获取URL的来源，包括 protocol 和 host    
> + request.href: 获取完整的请求URL，包括 protocol，host 和 url。
> + request.path: 获取请求路径名    
> + request.querystring: 根据? 获取原始查询字符串   
> + request.type: 获取请求 Content-Type, 不含 "charset" 等参数。

# Response
---
> Koa Response 对象是在 node 的原生响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

## API
> + response.header: 响应头对象  
> + response.headers:   响应头对象，别名是 response.header  
> + response.socket:    相应套接字  
> + response.status:    获取响应状态。默认情况下，response.status 设置为 `404 `而不是像 node 的 res.statusCode 那样默认为 200。 
> + response.status=:   通过数字代码设置响应状态    
> + response.message:   获取响应的状态消息. 默认情况下, response.message 与 response.status 关联.   
> + response.body:  获取响应主体。  
