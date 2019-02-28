const db = require('../connector')

const persons = () => {
    return db.query('select * from person', (error, results) => {
        if(error) 
            return error;
        return results[0].solution;
    })
}

Object.defineProperty(exports, 'persons', {
    get: () => persons
})