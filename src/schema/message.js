import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minLength: [1, 'Message must be at least 1 character'],
        reply: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: null
        }
    }
})