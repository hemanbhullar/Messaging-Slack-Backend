import Message from "../schema/message";
import crudRepository from "./crudRepository";

const messageRepository = {
    ...crudRepository(Message),
    getPaginatedMessaged: async (messageParams, page, limit) => {
        const messages = await Message.find(messageParams)
            .sort({ createdAt: 1})
            .limit(limit)
            .populate('senderId', 'username email avatar');

        return messages;
    }
};

export default messageRepository;