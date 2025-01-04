import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../repositories/channelRepository.js';
import workspaceRepository from "../repositories/workspaceRepository.js";
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

const isUserAdminOfWorkspace = (workspace, userId) => {
    const isMember = workspace.members.find(member => member.memberId.toString() === userId && member.role === 'admin');
    return isMember;
}

const isUserMemberOfWorkspace = (workspace, userId) => {    
    const isMember = workspace.members.find(member => member.memberId.toString() === userId);
    return isMember;
}


export const workspaceService = {
    createWorkspace: async function (workspaceData) {
        try {
            //create unique join code
            const joinCode = uuidv4().substring(0, 6).toUpperCase();
            const response = await workspaceRepository.create({
                name: workspaceData.name,
                description: workspaceData.description,
                joinCode
            });

            await workspaceRepository.addMemberToWorkspace(workspaceData.owner, response._id, 'admin');

            const updatedWorkspace = await workspaceRepository.addChannelToWorkspace('general', response._id);


            return updatedWorkspace;
        } catch (error) {
            console.log('Create Workspace service error', error);
            if (error.name === 'ValidationError') {
                throw new ValidationError({
                    error: error.errors
                },
                    error.message);
            };
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new ValidationError({
                    error: ['A workspace with same details already exists']
                },
                    'A workspace with same details already exists');
            };
            throw error;
        }
    },
    getWorkspaceById: async function (workspaceId) {
        const workspace = await workspaceRepository.getById(workspaceId);
        return workspace;
    },
    getWorkspace: async function (workspaceId, userId) {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        if (!isUserMemberOfWorkspace(workspace, userId)) {
            throw new ClientError({
                explanation: 'User is not a member of workspace',
                message: 'User is not a member of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        return workspace;
    },
    addMemberToWorkspace: async function (memberId, workspaceId, role, userId) {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of workspace',
                message: 'User is not an admin of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(memberId, workspaceId, role || 'member');
        return updatedWorkspace;
    },
    getWorkspaceByName: async function (workspaceName) {
        const workspace = await workspaceRepository.getWorkspaceByName(workspaceName);
        return workspace;

    },
    getWorkspaceByJoinCode: async function (joinCode, userId) {
        const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);
        if(!workspace){
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        if (!isUserMemberOfWorkspace(workspace, userId)) {
            throw new ClientError({
                explanation: 'User is not a member of workspace',
                message: 'User is not a member of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        return workspace;
    },
    getAllWorkspaces: async function () {
        const workspaces = await workspaceRepository.getAll();
        return workspaces;
    },
    addChannelToWorkspace: async function (channelName, workspaceId, userId) {
        const workspace = await workspaceRepository.getById(workspaceId);
        if (!workspace) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'Workspace not found',
                statusCode: StatusCodes.NOT_FOUND
            });
        }
        const isAdmin = isUserAdminOfWorkspace(workspace, userId);
        if (!isAdmin) {
            throw new ClientError({
                explanation: 'User is not an admin of workspace',
                message: 'User is not an admin of workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        }
        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(channelName || 'general', workspaceId);
        return updatedWorkspace;

    },
    fetchAllWorkspaceByMemberId: async function (userId) {
        try {
            const response = await workspaceRepository.fetchAllWorkspaceByMemberId(userId);
            return response;
        } catch (error) {
            console.log('Get workspace user is member of service error', error);
            throw error;
        }
    },
    deleteWorkspace: async function (workspaceId, userId) {
        try {
            const workspace = await workspaceRepository.getById(workspaceId);
            if (!workspace) {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                });
            }
            if (isUserAdminOfWorkspace(workspace, userId)) {
                await channelRepository.deleteMany(workspace.channels);
                const response = await workspaceRepository.delete(workspaceId);
                return response;
            }
            throw new ClientError({
                explaination: 'User not allowed to delete workspace',
                message: 'User not allowed to delete workspace',
                statusCode: StatusCodes.FORBIDDEN
            });
        } catch (error) {
            console.log('Delete workspace service error', error);
            throw error;
        }
    },
    updateWorkspace: async function (workspaceId, workspaceData, userId) {
        try {
            const workspace = await workspaceRepository.getById(workspaceId);
            if (!workspace) {
                throw new ClientError({
                    explanation: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                });
            }
            const isAllowed = isUserAdminOfWorkspace(workspace, userId);
            if (!isAllowed) {
                throw new ClientError({
                    explanation: 'User is not allowed to update workspace',
                    message: 'User is not allowed to update workspace',
                    statusCode: StatusCodes.FORBIDDEN
                });
            }
            const updatedWorkspace = await workspaceRepository.update(workspaceId, workspaceData);
            return updatedWorkspace;
        } catch (error) {
            console.log("Update workspace service error", error);
            throw error;
        }
    }
}