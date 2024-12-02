const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123leo',
    database: 'planetaverde',
})

module.exports=pool.promise()