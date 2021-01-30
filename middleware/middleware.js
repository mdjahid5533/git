const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
//const config = require('config')

const MONGODB_URI = `mongodb+srv://public-service:12345@cluster0.m6dgs.mongodb.net/public-service?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24
})

const {
    bindUserWithRequest
} = require('../middleware/bindUserWithRequest')
const setLocals = require('../middleware/setLocals')


const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY', //config.get('secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        store
    }),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => middleware.forEach(m => app.use(m))