import { StatusCodes } from "http-status-codes";

import { channelService } from "../service/channelService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const createChannel = async (req, res) => {
    try {
        const channel = await channelService.createChannel(req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse(channel, 'Channel created successfully')
        );
    } catch (error) {
        console.log("Channel controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}

export const getAllChannels = async (req, res) => {
    try {
        const channels = await channelService.getAllChannels();
        return res.status(StatusCodes.OK).json(
            successResponse(channels, 'Channels fetched successfully')
        );
    } catch (error) {
        console.log("Channel controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}

export const getChannelById = async (req, res) => {
    try {
        const channel = await channelService.getChannelById(req.params.channelId, req.user);
        return res.status(StatusCodes.OK).json(
            successResponse(channel, 'Channel fetched successfully')
        );
    } catch (error) {
        console.log("get channel by id controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}

export const deleteChannel = async (req, res) => {
    try {
        const response = await channelService.deleteChannel(req.params.channelId);
        return res.status(StatusCodes.OK).json(
            successResponse(response, 'Channel deleted successfully')
        );
    } catch (error) {
        console.log("Channel controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}

export const updateChannel = async (req, res) => {
    try {
        const updatedChannel = await channelService.updateChannel(req.params.channelId, req.body);
        return res.status(StatusCodes.OK).json(
            successResponse(updatedChannel, 'Channel updated successfully')
        );
    } catch (error) {
        console.log("Channel controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}
