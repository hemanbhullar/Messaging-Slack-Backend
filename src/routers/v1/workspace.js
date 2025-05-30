import express from 'express';

import { addChannelToWorkspace, addMemberToWorkspace, createWorkspace, deleteWorkspace, getAllWorkspaces, getWorkspaceById, getWorkspaceByJoinCode, getWorkspaceByName, getWorkspaceController, getWorkspaceUserIsMemberOfController, resetJoinCodeController, updateWorkspace } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, getWorkspaceByIdSchema, getWorkspaceByNameSchema, updateWorkspaceSchema, workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/', isAuthenticated, validate(workspaceSchema) , createWorkspace);
router.get('/', isAuthenticated, getAllWorkspaces);
router.get('/userworkspaces', isAuthenticated, getWorkspaceUserIsMemberOfController);
router.delete('/:workspaceId', isAuthenticated, deleteWorkspace);
router.get('/:workspaceId', isAuthenticated, getWorkspaceController);
router.get('/join/:joinCode', isAuthenticated, getWorkspaceByJoinCode);
router.put('/:workspaceId', isAuthenticated, validate(updateWorkspaceSchema), updateWorkspace);
router.put('/:workspaceId/members', isAuthenticated, validate(addMemberToWorkspaceSchema), addMemberToWorkspace);
router.get('/id/:workspaceId', validate(getWorkspaceByIdSchema), getWorkspaceById);
router.get('/name/:workspaceName', validate(getWorkspaceByNameSchema), getWorkspaceByName);
router.put('/:workspaceId/channels', isAuthenticated, validate(addChannelToWorkspaceSchema), addChannelToWorkspace);
router.put(
    `/:workspaceId/joinCode/reset`,
    isAuthenticated,
    resetJoinCodeController
)

export default router;