const moment = require('moment');

var wrapError = (request, status, message, error) => {
    return {
        status: status || 400,
        message: message || 'No message provided',
        error: error || 'Undefined error, Contact admin!!'
    };
};

var wrapSuccess = (request, status, message, data, contentFound) => {
    return {
        status: status || 200,
        message: message || 'No message provided',
        data: data || {},
        contentFound: contentFound
    };
};
module.exports = {

    successHandler: async (request, response, message, result) => {
        let successResponse = {};
        response.status(200);
        if (result == undefined || result.length < 1)
            successResponse = wrapSuccess(request, 204, message, result, false);
        else
            successResponse = wrapSuccess(request, 200, message, result, true);
        response.send(successResponse).end();
    },
    errorHandler: async (request, response, error) => {
        let errorResponse = {};
        switch (error.name) {
            case 'ValidationError':
                response.status(422);
                errorResponse = wrapError(request, 422, error.message, 'Validation Error');
                break;
            case 'MongoError':
                response.status(422);
                errorResponse = wrapError(request, 422, error.message, 'Unique key error');
                break;
            case 'TokenExpiredError':
                response.status(401);
                errorResponse = wrapError(request, 401, 'Session Expired, Please login again', error.name);
                break;
            case 'JsonWebTokenError':
                response.status(401);
                errorResponse = wrapError(request, 401, 'Token invalid.', error.name);
                break;
            default:
                response.status(400);
                errorResponse = wrapError(request, 400, error.message, error.name);
                break;
        }
        response.send(errorResponse).end();
    }
};