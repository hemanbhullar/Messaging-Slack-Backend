import { z } from 'zod';

export const workspaceSchema = z.object({
    name: z.string().min(3).max(50)
});

export const updateWorkspaceSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3)
});

export const addMemberToWorkspaceSchema = z.object({
    memberId: z.string()
});

export const addChannelToWorkspaceSchema = z.object({
    channelId: z.string()
});

export const fetchAllWorkspaceByMemberIdSchema = z.object({
    memberId: z.string()
});

export const getWorkspaceByIdSchema = z.object({
    workspaceId: z.string()
});

export const getWorkspaceByNameSchema = z.object({
    workspaceName: z.string()
});

export const getWorkspaceByJoinCodeSchema = z.object({
    joinCode: z.string()
});

export const deleteWorkspaceSchema = z.object({
    workspaceId: z.string()
});

export const getAllWorkspacesSchema = z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive()
});