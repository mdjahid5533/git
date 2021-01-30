const cheerio = require('cheerio')
const moment = require('moment')
const Profile = require('../model/Profile')

module.exports = () => {
    return async (req, res, next) => {
        try {
            /*let profile = await Profile.findOne({
                user: req.user._id
            })*/

            res.locals.user = req.user
            res.locals.isLoggedIn = req.session.isLoggedIn
            //res.locals.userProfile = profile
            res.locals.truncate = html => {
                let $ = cheerio.load(html)
                let text = $.text()

                text = text.replace(/(\r\n|\n\r)/gm, '')
                if (text.length <= 100) return text

                return text.slice(0, 100) + '...'
            }
            res.locals.moment = times => moment(times).fromNow()
            next()
        } catch (e) {
            next(e)
        }
    }
}