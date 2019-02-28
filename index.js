require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')
const { persons } = require('./db')

let app = express()
    .use(express.static(
        path.join(__dirname + '/static')
    ))
    .get('/', (request, response) => {
        response.send('test')
    })
    .get('/person', (request, response) => {
        console.log(persons())
        response.send(persons())
    })

http.createServer(app)
    .listen(process.env.HTTP_PORT,
        process.env.HTTP_HOST, () => {
            console.log(`server running @ ${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`)
        })

