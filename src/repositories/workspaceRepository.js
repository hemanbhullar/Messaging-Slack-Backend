import { StatusCodes } from "http-status-codes";

import User from "../schema/user.js";
import Workspace from "../schema/workspace.js";
import ClientError from "../utils/errors/clientError.js"
import channelRepository from "./channelRepository.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
    ...crudRepository(Workspace),//destructoring crudReposity

    getWorkspaceByName: async function (workspaceName) {
        try {
            const workspace = await Workspace.findOne({ name: workspaceName });

            if(!workspace)  {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            return workspace;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    getWorkspaceByJoinCode: async function (joinCode) {
        try {
            const workspace = await Workspace.findOne({ joinCode });
            if(!workspace)  {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            return workspace;
        } catch (error) {
            console.log(error); //log error
            throw error; //throw error
        }
    },
    addMemberToWorkspace: async function (memberId, workspaceId, role) {
        try {
            const workspace = await Workspace.findById(workspaceId);
            if(!workspace)  {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            
            const isValidUser = await User.findById(memberId);
            if(!isValidUser) {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'User not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            const member = {
                memberId,
                role
            }
            if(workspace.members.find(m => m.memberId.toString() === memberId.toString())){
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'User already part of workspace',
                    statusCode: StatusCodes.FORBIDDEN
                })
            }
            workspace.members.push(member); //push member to workspace
            await workspace.save(); //save workspace
            return workspace;
        } catch (error) {
            console.log(error);
            throw error;
        }

    },
    addChannelToWorkspace: async function (channelName, workspaceId) {
        try {
            const workspace = await Workspace.findById(workspaceId).populate('channels');
            if(!workspace)  {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            const isChannelAlreadyExist = workspace.channels.find(channel => channel.name === channelName);
            if(isChannelAlreadyExist) {
                throw new ClientError({
                        explaination: 'Invalid data sent from the client',
                        message: 'Channel already part of workspace',
                        statusCode: StatusCodes.FORBIDDEN
                })
            }
            const channel = await channelRepository.create({ name: channelName });

            workspace.channels.push(channel); //push channel to workspace
            await workspace.save(); //save workspace
            return workspace;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    fetchAllWorkspaceByMemberId: async function (memberId) {
        try {
            const workspaces = await Workspace.find({ 'members.memberId': memberId }).populate('members.memberId', 'username email avatar');
            if(!workspaces)  {
                throw new ClientError({
                    explaination: 'Invalid data sent from the client',
                    message: 'Workspace not found',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            return workspaces;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default workspaceRepository;