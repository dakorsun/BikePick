import express from 'express';
import models from '../models';
import { signUp, updateUser } from '../services/UserService';
import authenticate from "../middlewares/authenticate";

const User = models.User;
const router = express.Router();

router.post('/', async (req, res) => {
    const user = req.body.user;
    const userRecord = await signUp(user);
    res.json({ user: userRecord.toAuthJSON() });
});

router.get('/', authenticate, async (req, res) => {
    const { id } = req.authUser;
    const user = await User.findOne({ where: { id } });
    res.json({ user: user.toFullJSON() });
});

router.post('/update', authenticate, async (req, res) => {
    const { id } = req.authUser;

    const updatedFields = Object.keys(req.body)
        .reduce((p, c) => Object.assign(p, { [c]: req.body[c] }), {});

    const user = await updateUser(id, updatedFields);
    res.json({ user: user.toFullJSON() });
});

export default router;
