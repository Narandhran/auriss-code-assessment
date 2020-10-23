const userCtl = require('../controllers/user');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.put('/user/update_profile/:id', AdminOnly, userCtl.editProfile);
    /**
     * All users
     */
    app.post('/user/register', userCtl.register);
    app.post('/user/login', userCtl.login);

    /**
     * Authenticated users only
     */
    app.get('/user/profile', AllUsers, userCtl.getProfile);
};