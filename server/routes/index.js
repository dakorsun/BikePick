import express from 'express';
import Boom from 'boom';

import auth from './auth';
import users from './users';
import test from './test';
import { parseErrors, parseSequelizeErrors } from '../utils/CommonUtils';

const router = express.Router({});

router.use('/api/auth', auth);
router.use('/api/users', users);
router.use('/api/test', test);

// the express error handler
router.use((err, req, res, next) => {
    // here we can have custom handlers for different type of errors if needed
    let statusCode;
    let error;

    switch (true) {
    case (err.isBoom):
        statusCode = err.output.statusCode;
        error = err;
        break;
    case (err.name === 'JsonWebTokenError'):
        statusCode = 401;
        error = Boom.unauthorized(err.name, 'local');
        break;
    case (err.name === 'ValidationError'):
        statusCode = 400;
        error = Boom.badRequest(err.name, parseErrors(err.errors));
        break;
    case (err.name === 'SequelizeDatabaseError'):
        statusCode = 400;
        error = Boom.badRequest(err.name, parseSequelizeErrors(err.errors));
        break;
    case (err.name === 'SequelizeValidationError'):
        statusCode = 400;
        error = Boom.badRequest(err.name, parseSequelizeErrors(err.errors));
        break;
    default:
        statusCode = 500;
        console.error(err);
        error = Boom.boomify(err);
        error.message = 'Something went wrong';
        break;
    }

    const errorResponse = {
        statusCode,
        error: error.output.payload.error,
        message: error.output.payload.message,
        payload: (error.data || { _error: error.message }),
    };
    res.status(statusCode).json(errorResponse);
});

export default router;
