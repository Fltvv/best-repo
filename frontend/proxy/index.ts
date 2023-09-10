const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

const app = express()

const API_SERVICE_URL = 'http://iceroute.ru'
const PORT = 4000
const HOST = "localhost"

app.use(cors( {
        exposedHeaders:'*'
    }))
app.use ("/", createProxyMiddleware({
    target: API_SERVICE_URL,
        changeOrigin: true,
        ws: true,
        logLevel: "debug"
}))
app.listen(PORT, HOST, () => {
    console. log( `Starting Proxy Server at ${HOST}: ${PORT}`)
})
