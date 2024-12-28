import express from 'express';

import { createChannel, deleteChannel, getAllChannels, getChannelById, updateChannel } from '../../controllers/channelController.js';
import { createChannelSchema } from '../../validators/channelSchema.js';
import { getAllChannelsSchema } from '../../validators/channelSchema.js';
import { getChannelByIdSchema } from '../../validators/channelSchema.js';
import { deleteChannelSchema } from '../../validators/channelSchema.js';
import { updateChannelSchema } from '../../validators/channelSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/', validate(createChannelSchema) , createChannel);
router.get('/', validate(getAllChannelsSchema) , getAllChannels);
router.get('/:channelId', validate(getChannelByIdSchema), getChannelById);
router.delete('/:channelId', validate(deleteChannelSchema), deleteChannel);
router.put('/:channelId', validate(updateChannelSchema), updateChannel);

export default router;