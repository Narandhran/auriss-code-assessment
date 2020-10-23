const { hashSync, compareSync,genSaltSync } = require('bcrypt-nodejs');

/*
 * Custom
 * Crypto Service
 */

module.exports = {
    encrypt: (plainText) => {
        return hashSync(plainText, genSaltSync(10));
    },
    validate: (plainText, hashText) => {
        if (compareSync(plainText, hashText))
            return true;
        else
            return false;
    }
};