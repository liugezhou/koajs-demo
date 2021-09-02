const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const {privateKey,publicKey,aliPublicKey,appId} = require('./config/key');
const CryptoJS = require("crypto-js");
const obj = require('./config/key')
app.use(bodyParser())

app.use(async (ctx) => {
    if(ctx.url ==='/aiyou/alibaba/apply' &&ctx.method === 'POST'){
        let {token,timestamp,sign,aesKey,data} = ctx.request.body
        var bytes  = CryptoJS.AES.decrypt(ciphertext, privateKey);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);
        ctx.body = params
    }
    if(ctx.url ==='/goAli' && ctx.method ==='GET'){ //调用云浩方法
        const token = Math.random().toString(32).substr(2);
        const timestamp = new Date().getTime();
            

    }
})