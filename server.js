require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const path = require('path')
const jwt = require('jsonwebtoken')
const { persons, users } = require('./db')

const corsOptions = {
    origin: 'http://localhost:8000'
}

const app = express()
    .use(bodyParser.urlencoded({extended : true}))
    .use(bodyParser.json())
    .use(cors(corsOptions))
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
            if(result.ok) {
                const token = jwt.sign({ id: username }, process.env.SECRET, {
                    expiresIn: 86400
                });
                response.send({
                    ok: true,
                    message: 'Authenticated successfully',
                    token
                })
            } else {
                response.send({
                    ok: false,
                    message: 'Mismatch username/password'
                })
            }
        }).catch(error => {
            response.send({
                ok: false,
                message: 'Mismatch username/password'
            })
        })
    })
    .get('/isLoggedin', (request, response) => {
        const token = request.headers['x-access-token']
        if (!token) {
            return response.status(401).send({
                auth: false, message: 'No token provided.'
            })
        }

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return response.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                })
            }
            response.status(200).send({
                ok: true
            })
        })
    })
    .get('/menu', (request, response) => {
        const token = request.headers['x-access-token']
        if (!token) {
            return response.status(401).send({
                auth: false, message: 'No token provided.'
            })
        }

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return response.status(500).send({
                    auth: false,
                    message: 'Failed to authenticate token.'
                })
            }
            users.getMenu(decoded.id).then(result => {
                return response.send(result)
            })
        })
    })
    .post('/logout',(request, response) => {
        request.session.destroy()
        response.send({
            ok: true
        })
    })

http.createServer(app)
    .listen(process.env.HTTP_PORT,
        process.env.HTTP_HOST, () => {
            console.log(`server running @ ${process.env.HTTP_HOST}:${process.env.HTTP_PORT}`)
        })

