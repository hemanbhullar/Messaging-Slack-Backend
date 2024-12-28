import channelRepository from "../repositories/channelRepository.js";

export const channelService = {
    createChannel: async function (data) {
        const newDoc = await channelRepository.create(data);
        return newDoc;
    },
    getAllChannels: async function () {
        const allDocs = await channelRepository.getAll();
        return allDocs;
    },
    getChannelById: async function (id) {
        const doc = await channelRepository.getById(id);
        return doc;
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