if (process.env.NODE_ENV === 'production') {
    module.exports = require('./parameters.prod')
} else {
    module.exports = require('./parameters.dev')
}
