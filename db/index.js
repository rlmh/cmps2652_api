const db = require('../connector')
const users = require('./users')(db)
const persons = require('./persons')(db)

Object.defineProperty(exports, 'persons', {
    get: () => persons
})