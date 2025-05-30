import express from 'express';

import channelRouter from './channel.js';
import memberRouter from './member.js';
import userRouter from './user.js';
import workspaceRouter from './workspace.js';

const router = express.Router();

router.use('/users', userRouter);

router.use('/channels', channelRouter);

router.use('/workspaces', workspaceRouter);

router.use('/members', memberRouter);

export default router;