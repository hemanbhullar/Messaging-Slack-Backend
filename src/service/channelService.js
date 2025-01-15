import { StatusCodes } from "http-status-codes";

import channelRepository from "../repositories/channelRepository.js";
import messageRepository from "../repositories/messageRepository.js";
import ClientError from "../utils/errors/clientError.js";
import { isUserMemberOfWorkspace } from "./workspaceService.js";

export const channelService = {
    createChannel: async function (data) {
        const newDoc = await channelRepository.create(data);
        return newDoc;
    },
    getAllChannels: async function () {
        const allDocs = await channelRepository.getAll();
        return allDocs;
    },
    getChannelById: async function (channelId, userId) {
        try {
            const channel = await channelRepository.getChannelWithWorkspaceDetails(channelId);

            console.log(channel);
            
            if(!channel || !channel.workspaceId) {
                throw new ClientError ({
                    message: 'Channel not found with the provided ID',
                    explanation: 'Invalid  data send from the client',
                    statusCode: StatusCodes.NOT_FOUND
                })
            }
            const isUserPartOfWorkspace = isUserMemberOfWorkspace(
                channel.workspaceId,
                userId
            );

            if(!isUserPartOfWorkspace) {
                throw new ClientError({
                    message: 'User is not a member of the workspace hence cannot access the channel',
                    explanation: 'User is not a member of the workspace',
                    statusCode: StatusCodes.UNAUTHORIZED
                })
            }

            const messages = await messageRepository.getPaginatedMessaged({channelId}, 1, 20);
            return {
                messages,
                _id: channel._id,
                name: channel.name,
                createdAt: channel.createdAt,
                updatedAt: channel.updatedAt,
                workspaceId: channel.workspaceId
            };
        } catch (error) {
            console.log("Get channel by ID service error", error);
            throw error;
        }
    },
    deleteChannel: async function (id) {
        const response = await channelRepository.delete(id);
        return response;
    },
    updateChannel: async function (id, data) {
        const updatedDoc = await channelRepository.update(id, data);
        return updatedDoc;
    }
}