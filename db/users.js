module.exports = (db) => {
    return {
        authenticate: (username, password) => {
            // return a promise
            return new Promise((resolve, reject) => {
                // attempt to connect to database
                db.connect(error => {
                    if (error) // if there is an error reject
                        reject(error)
                    // if no error execute query
                    db.query(`SELECT * FROM users 
                        WHERE username=? AND password=sha1(?)`, 
                        [username, password], (error, results) => {
                        // if there was an error executing query
                        if (error)
                            reject(error)
                        // return results
                        resolve(results[0])
                    })
                })
            })
        }
    }
}