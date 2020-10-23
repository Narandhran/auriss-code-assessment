const mongoose = require('mongoose');
// establish connection to mongodb
var database = {
    connectivity: (config) => {
        mongoose.set('debug', true);
        mongoose.Promise = global.Promise;
        mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`,
            { useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true });
        const db = mongoose.connection;
        return db;
    }
};

module.exports = database;