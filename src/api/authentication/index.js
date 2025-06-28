import express from 'express';
import { signIn, signUp } from './controller.js';
import userExistsValidator from '../../middlewares/validators/user-exist.js';
import emailExistsValidator from '../../middlewares/validators/email-exist.js';

const router = express.Router();

router.post('/sign-in', emailExistsValidator, signIn);
router.post('/sign-up', userExistsValidator, signUp);

export default router;
