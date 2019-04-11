module.exports = (db) => {
    return {
        authenticate: (username, password) => {
            // return a promise
            return new Promise((resolve, reject) => {
                // attempt to connect to database
                db.query(`SELECT * FROM users 
                    WHERE username=? AND password=sha1(?)`, 
                    [username, password], (error, results) => {
                    // if there was an error executing query
                    if (error)
                        reject({ok: false, error})
                    // was there a record returned from db
                    if (results.length) {
                        if (results[0].id) {
                            resolve({ok: true, data: results})
                        }
                    } else { // no match found
                        reject({ok: false})
                    }
                })
            })
        },
        getMenu: (username) => {
            // return a promise
            return new Promise((resolve, reject) => {
                // attempt to connect to database
                db.query(`SELECT name FROM users
                    JOIN roles on roles.id = roleId 
                    WHERE username=?`, 
                    [username], (error, results) => {
                    // if there was an error executing query
                    if (error)
                        reject({ok: false, error})
                    else {
                        let menu = []

                        if(results[0].name == 'admin') {
                            menu = [{
                                menu: 'User Accounts',
                                url: '/users'
                            }, {
                                menu: 'Reports',
                                url: '/reports'
                            }, {
                                menu: 'Test',
                                url: '/test'
                            }]
                        }
                        
                        resolve({ok: true, data: {
                            role: results[0].name,
                            menu
                        }})
                    }
                })
            })
        }
    }
}