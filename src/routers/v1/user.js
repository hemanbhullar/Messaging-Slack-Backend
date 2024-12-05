import express from 'express';

import { signin, signup } from '../../controllers/userController.js';
import { userSignInSchema, userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

router.post('/signup',validate(userSignUpSchema), signup);
router.get('/signin', validate(userSignInSchema), signin);

export default router;