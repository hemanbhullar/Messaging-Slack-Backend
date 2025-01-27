import express from 'express';

import { forgetPassword, resetPassword } from '../../controllers/forgetPasswordController.js';
import { signin, signup } from '../../controllers/userController.js';
import { userSignInSchema, userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

router.post('/signup',validate(userSignUpSchema), signup);
router.post('/signin', validate(userSignInSchema), signin);
router.post('/forgetPassword', forgetPassword);
router.post('/reset-password/:token', resetPassword);

export default router;