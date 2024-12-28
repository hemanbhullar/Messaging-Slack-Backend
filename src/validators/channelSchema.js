import { z } from 'zod';

export const createChannelSchema = z.object({
    name: z.string().min(3).max(50)
});

export const updateChannelSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3)
});

export const getChannelByIdSchema = z.object({
    channelId: z.string()
});

export const deleteChannelSchema = z.object({
    channelId: z.string()
});

export const getAllChannelsSchema = z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive()
});

