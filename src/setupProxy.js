const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:8080',
            changeOrigin: true, // 控制服务器请求头中host的值
            pathRewrite: { '^/api': '' }  //重写请求路径
        })
    )
}