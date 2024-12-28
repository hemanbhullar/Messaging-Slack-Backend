import express from 'express';

import channelRouter from './channel.js';
import userRouter from './user.js';
import workspaceRouter from './workspace.js';

const router = express.Router();

router.use('/user', userRouter);

router.use('/channel', channelRouter);

router.use('/workspace', workspaceRouter);

export default router;