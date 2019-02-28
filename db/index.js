const mysql = require('mysql');

module.exports =
    mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB
    });