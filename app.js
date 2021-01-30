require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')

const middleware = require('./middleware/middleware')
const routes = require('./router/routes')

const MONGODB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.m6dgs.mongodb.net/public-service?retryWrites=true&w=majority`

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

middleware(app)
routes(app)

const PORT = process.env.PORT || 8080
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        app.listen(PORT, () => {
            console.log(chalk.green('DataBase Connected...  '));
            console.log(chalk.green.inverse(`SERVER IS RUNNING ON PORT ${chalk.white.bold(PORT)}`))
        })
    })
    .catch(err => {
        console.log(err);
    });