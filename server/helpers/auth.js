const crypto = require('crypto');
const db = require('../models/dataBase');

const authorization = (email, pass, cb) => {
    const user = db.get('auth').value();

    crypto.pbkdf2(pass, user.salt, 1000, 512, 'sha512', (err, hash) => {
        if (err) {
            return cb(new Error('Возникла ошибка попробуйте еще раз'), false)
        }

        cb(null, {
            email: user.email === email,
            pass:hash.toString('hex') === user.hash
        })
    })
};

const setUser = (email, pass) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(pass, salt, 1000, 512, 'sha512', (err, hash) => {
        if (err) {
            return
        }

        db.set('auth', {
            email,
            salt,
            hash: hash.toString('hex')
        }).write()
    })
};

module.exports = {
    authorization,
    setUser,
}