require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')
const db = require('./db')

let app = express()
    .use(express.static(
        path.join(__dirname + '/static')
    ))
    .get('/', (request, response) => {
        response.send('test')
    })

http.createServer(app)
    .listen(process.env.HTTP_PORT,
        process.env.HTTP_HOST, () => {
            console.log(`server running @ ${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`)
        })

