import express from 'express';
import jwt from 'jsonwebtoken';
import Boom from 'boom';

import appConfig from '../../config/appConfig';
import models from '../models';

const User = models.User;
const router = express.Router();

router.post('/', async (req, res) => {
    const {credentials} = req.body;

    const user = await User.findOne({where: {email: credentials.email}});
    if (!user || !user.isValidPassword(credentials.password)) {
        throw Boom.unauthorized('Invalid credentials', 'local');
    }

    res.json({user: {...user.toAuthJSON(), ...user.toFullJSON()}});
});

router.get('/confirmation/:token', async (req, res) => {
    const {token} = req.params;

    const result = await User.update(
        {confirmationToken: '', confirmed: true},
        {where: {confirmationToken: token}},
    );
    if (!result[0] > 0) {
        throw Boom.badRequest('Something went wrong');
    }

    res.redirect('/confirmation');
});

router.post('/reset_password_request', async (req, res) => {
    const user = await User.findOne({where: {email: req.body.email}});
    if (user) {
        //todo send reset password instructions
    } else {
        console.warn(`Try to reset password for not registered email [${req.body.email}]`);
    }
    res.json({});

});

router.post('/validate_token', async (req, res) => {
    const token = req.body.token;
    jwt.verify(token, appConfig.JWT_SECRET);
    res.json({});
});

router.post('/reset_password', async (req, res) => {
    const {token, password} = req.body.data;

    const decoded = jwt.verify(token, appConfig.JWT_SECRET);
    const user = await User.findOne({where: {id: decoded.id}});
    if (!user) {
        throw Boom.notFound('Invalid Token');
    }
    user.setPassword(password);
    await user.save();
    res.json({});
});

export default router;
