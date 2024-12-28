import express from 'express';

import { addChannelToWorkspace, addMemberToWorkspace, createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspaceById, getWorkspaceByJoinCode, getWorkspaceByName, getWorkspaceUserIsMemberOfController, updateWorkspace } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, getWorkspaceByIdSchema, getWorkspaceByJoinCodeSchema, getWorkspaceByNameSchema, updateWorkspaceSchema, workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/', isAuthenticated, validate(workspaceSchema) , createWorkspace);
router.get('/', isAuthenticated, getAllWorkspaces);
router.get('/userworkspaces', isAuthenticated, getWorkspaceUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspace);
router.get('/:workspaceId', validate(getWorkspaceByIdSchema), getWorkspaceById);
router.get('/name/:workspaceName', validate(getWorkspaceByNameSchema), getWorkspaceByName);
router.get('/joinCode/:joinCode', validate(getWorkspaceByJoinCodeSchema), getWorkspaceByJoinCode);
router.put('/:workspaceId', validate(updateWorkspaceSchema), updateWorkspace);
router.post('/member', validate(addMemberToWorkspaceSchema), addMemberToWorkspace);
router.post('/channel', validate(addChannelToWorkspaceSchema), addChannelToWorkspace);

export default router;