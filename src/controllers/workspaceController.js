import { StatusCodes } from "http-status-codes";

import { workspaceService } from "../service/workspaceService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const createWorkspace = async (req, res) => {
    try {
        const newWorkspace = await workspaceService.createWorkspace({
            ...req.body,
            owner: req.user
        });
        return res.status(StatusCodes.CREATED).json(successResponse(newWorkspace, "Workspace created successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.status){
            return res.status(error.status).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getWorkspaceById = async (req, res) => {
    try {
        const workspace = await workspaceService.getWorkspaceById(req.params.workspaceId);
        return res.status(StatusCodes.OK).json(successResponse(workspace, "Workspace fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getWorkspaceController = async (req, res) => {
    try {
        const workspace = await workspaceService.getWorkspace(req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(workspace, "Workspace fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
        
    }
}

export const addMemberToWorkspace = async (req, res) => {
    try {
        const updatedWorkspace = await workspaceService.addMemberToWorkspace(req.body.memberId, req.params.workspaceId, req.body.role || 'member', req.user);
        return res.status(StatusCodes.OK).json(successResponse(updatedWorkspace, "Member added to workspace successfully"));    
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getWorkspaceByName = async (req, res) => {
    try {
        const workspace = await workspaceService.getWorkspaceByName(req.params.workspaceName);
        return res.status(StatusCodes.OK).json(successResponse(workspace, "Workspace fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getWorkspaceByJoinCode = async (req, res) => {
    try {
        const workspace = await workspaceService.getWorkspaceByJoinCode(req.params.joinCode, req.user);
        return res.status(StatusCodes.OK).json(successResponse(workspace, "Workspace fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await workspaceService.getAllWorkspaces();
        return res.status(StatusCodes.OK).json(successResponse(workspaces, "Workspaces fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const addChannelToWorkspace = async (req, res) => {
    try {
        const updatedWorkspace = await workspaceService.addChannelToWorkspace(req.body.channelName, req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(updatedWorkspace, "Channel added to workspace successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const getWorkspaceUserIsMemberOfController = async (req, res) => {
    try {
        const workspaces = await workspaceService.fetchAllWorkspaceByMemberId(req.user);
        return res.status(StatusCodes.OK).json(successResponse(workspaces, "Workspaces fetched successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const deleteWorkspace = async (req, res) => {
    try {
        const workspace = await workspaceService.deleteWorkspace(req.params.workspaceId, req.user);
        return res.status(StatusCodes.OK).json(successResponse(workspace, "Workspace deleted successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}

export const updateWorkspace = async (req, res) => {
    try {
        const updatedWorkspace = await workspaceService.updateWorkspace(req.params.workspaceId, req.body, req.user);
        return res.status(StatusCodes.OK).json(successResponse(updatedWorkspace, "Workspace updated successfully"));
    } catch (error) {
        console.log("Workspace controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalErrorResponse(error));
    }
}
