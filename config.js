
const dotenv = require('dotenv').config();
module.exports = {
    name: 'API',
    version: '1',
    development: {
        SERVER_PORT: '3000',
        DB_NAME: 'auriss',
        DB_USER: 'naren',
        DB_PASS: 'doTry',
        DB_HOST: 'cluster0.nwzw5.mongodb.net',
    }
};

