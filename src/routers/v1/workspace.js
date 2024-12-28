import express from 'express';

import { addChannelToWorkspace, addMemberToWorkspace, createWorkspace, deleteWorkspace, fetchAllWorkspaceByMemberId, getAllWorkspaces, getWorkspaceById, getWorkspaceByJoinCode, getWorkspaceByName, updateWorkspace } from '../../controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { addChannelToWorkspaceSchema, addMemberToWorkspaceSchema, deleteWorkspaceSchema, fetchAllWorkspaceByMemberIdSchema, getAllWorkspacesSchema, getWorkspaceByIdSchema, getWorkspaceByJoinCodeSchema, getWorkspaceByNameSchema, updateWorkspaceSchema, workspaceSchema } from '../../validators/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

router.post('/', isAuthenticated, validate(workspaceSchema) , createWorkspace);
router.get('/', validate(getAllWorkspacesSchema) , getAllWorkspaces);
router.get('/:workspaceId', validate(getWorkspaceByIdSchema), getWorkspaceById);
router.get('/name/:workspaceName', validate(getWorkspaceByNameSchema), getWorkspaceByName);
router.get('/joinCode/:joinCode', validate(getWorkspaceByJoinCodeSchema), getWorkspaceByJoinCode);
router.get('/member/:memberId', validate(fetchAllWorkspaceByMemberIdSchema), fetchAllWorkspaceByMemberId);
router.put('/:workspaceId', validate(updateWorkspaceSchema), updateWorkspace);
router.delete('/:workspaceId', validate(deleteWorkspaceSchema), deleteWorkspace);
router.post('/member', validate(addMemberToWorkspaceSchema), addMemberToWorkspace);
router.post('/channel', validate(addChannelToWorkspaceSchema), addChannelToWorkspace);

export default router;