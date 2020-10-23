const { User } = require('../models/user');
const { sign } = require('./custom/jwt.service');
const { encrypt, validate } = require('./custom/crypto.service');
const { request } = require('express');

module.exports = {
    register: async (request, cb) => {
        let isUserExist = await User.findOne({ 'mobile': request.body.mobile });
        isAdmin = await User.find({}).lean();
        if (isUserExist) cb(new Error('User already exist', {}));
        else {
            let persisted = request.body;
            persisted.role = isAdmin.length > 0 ? 'USER' : 'ADMIN';
            persisted.password = encrypt(persisted.password);
            await User.create(persisted, async (err, result) => {
                cb(err, result);
            });
        }
    },
    login: async (request, cb) => {
        let { mobile, password } = request.body;
        let isUser = await User.findOne({ 'mobile': mobile });
        if (isUser) {
            if (validate(password, isUser.password)) {
                let token = {};
                try {
                    token = sign({
                        _id: isUser._id,
                        email: isUser.email,
                        role: isUser.role,
                        fullname: isUser.fullname,
                    });
                    cb(null, { token });
                } catch (e) { cb(e, {}); };
            } else cb(new Error('Invalid password, try again'))
        } else cb(new Error('Mobile number not registered'), {});
    },
    getProfile: async (request, cb) => {
        let { _id, role } = request.verifiedToken;
        let profile = {}
        profile = role == 'ADMIN'
            ? await User.find({}, 'fname lname email phone gender').lean()
            : await User.findById(_id, 'fname lname email phone gender').lean();
        cb(null, profile)
    },
    editProfile: async (request, cb) => {
        await User
            .findOneAndUpdate(
                { 'mobile': request.params.mobile },
                { '$set': request.body },
                {
                    'fields': { 'fname': 1, 'lname': 1, 'email': 1, 'phone': 1, 'gender': 1 },
                    new: true
                }).exec((err, result) => {
                    cb(err, result);
                });
    }
};