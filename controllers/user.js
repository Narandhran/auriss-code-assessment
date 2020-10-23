const { register, login, getProfile, editProfile } = require('../services/user');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    register: (req, res) => {
        register(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Successfully registered', {});
        });
    },
    login: (req, res) => {
        login(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Login success', result);
        });
    },
    getProfile: (req, res) => {
        getProfile(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    editProfile: (req, res) => {
        editProfile(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Updated successfully', result);
        });
    }
};