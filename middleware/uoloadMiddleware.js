const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        const type = /jpeg|jpg|png/
        const extName = type.test(path.extname(file.originalname).toLowerCase())
        const mimeType = type.test(file.mimetype)

        if(extName && mimeType){
            cb(null, true)
        } else {
            cb(new Error('Only Support jpg or png'))
        }
    }
})

module.exports = upload