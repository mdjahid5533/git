const authRoutes = require('./authRouth')
const dashboardRoutes = require('./dashboardRoutes')
const uploadRoutes = require('./uploadRoutes')
const postRoutes = require('./postRoutes')
const explorerRoutes = require('./explorerRoutes')
const searchRoutes = require('./searchRoutes')
const authorRoutes = require('./authorRoutes')
const apiRoutes = require('../api/routes/apiRoutes')

const routes = [{
        path: '/auth',
        controller: authRoutes
    }, {
        path: '/dashboard',
        controller: dashboardRoutes
    }, {
        path: '/posts',
        controller: postRoutes
    }, {
        path: '/uploads',
        controller: uploadRoutes
    },
    {
        path: '/search',
        controller: searchRoutes
    },
    {
        path: '/author',
        controller: authorRoutes
    },
    {
        path: '/api',
        controller: apiRoutes
    },
    {
        path: '/',
        controller: explorerRoutes
    }
]

module.exports = app => routes.forEach(r => app.use(r.path, r.controller))