
var express = require('express');
var {createProxyMiddleware} = require("http-proxy-middleware");

var proxyPath = "http://localhost:3000/";//目标后端服务地址(公司同事电脑地址)

var proxyOption ={
    target:proxyPath,
    changeOrigoin:true
};

console.log(createProxyMiddleware)
var app = express();
app.use(express.static("./public"));
app.use("/", createProxyMiddleware(proxyOption))
//这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)
app.listen(8000);