require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')
const { persons, users } = require('./db')

const app = express()
    .use(express.static(
        path.join(__dirname + '/static')
    ))
    .use(express.urlencoded())
    .get('/', (request, response) => {
        response.send('test')
    })
    .get('/persons', (request, response) => {
        persons().then(data => {
            response.send(data)
        })
    })
    .post('/login', (request, response) => {
        const { username, password } = request.body
        users.authenticate(username, password).then(result => {
            if(result)
                response.send({
                    ok: true,
                    message: 'Authenticated successfully'
                })
        }).catch(error => {
            console.log(error)
            response.send({
                ok: false,
                message: 'Mismatch username/password'
            })
        })
    })

http.createServer(app)
    .listen(process.env.HTTP_PORT,
        process.env.HTTP_HOST, () => {
            console.log(`server running @ ${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`)
        })

