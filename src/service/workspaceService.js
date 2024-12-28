import { v4 as uuidv4 } from 'uuid';

import workspaceRepository from "../repositories/workspaceRepository.js";
import ValidationError from '../utils/errors/validationError.js';

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
                    error:  error.errors
                },
            error.message);
            };
            if (error.name === 'MongoServerError' && error.code === 11000) {
                throw new ValidationError({
                    error:  ['A workspace with same details already exists']
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
    addMemberToWorkspace: async function (memberId, workspaceId, role) {
        const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(memberId, workspaceId, role);
        return updatedWorkspace;
    },
    getWorkspaceByName: async function (workspaceName) {
        const workspace = await workspaceRepository.getWorkspaceByName(workspaceName);
        return workspace;

    },
    getWorkspaceByJoinCode: async function (joinCode) {
        const workspace = await workspaceRepository.getWorkspaceByJoinCode(joinCode);
        return workspace;
    },
    getAllWorkspaces: async function () {
        const workspaces = await workspaceRepository.getAll();
        return workspaces;
    },
    addChannelToWorkspace: async function (channelName, workspaceId) {
        const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(channelName, workspaceId);
        return updatedWorkspace;

    },
    fetchAllWorkspaceByMemberId: async function (memberId) {
        const workspaces = await workspaceRepository.fetchAllWorkspaceByMemberId(memberId);
        return workspaces;
    },
    deleteWorkspace: async function (workspaceId) {
        const response = await workspaceRepository.delete(workspaceId);
        return response;

    },
    updateWorkspace: async function (workspaceId, workspace) {
        const updatedWorkspace = await workspaceRepository.update(workspaceId, workspace);
        return updatedWorkspace;
    }
}