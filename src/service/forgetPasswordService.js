import bcrypt from 'bcrypt';
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from "../config/serverConfig.js";
import { addEmailtoMailQueue } from "../producers/mailQueueProducer.js";
import userRepository from "../repositories/userRepository.js";
import { createJWT } from "../utils/common/authUtils.js";
import { forgetPasswordMail } from "../utils/common/mailObject.js";
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const forgetPasswordService = async (email) => {
    try {
        //Find the user by email
        console.log(email);
        const user = await userRepository.getByEmail(email);
        if(!user) {
            throw new ClientError({
                explaination: 'Invalid data sent from the client',
                message: 'No registered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        //Generate a unique JWT token for the user that contains the user's id
        const token = createJWT({id: user.id, email: user.email});
        //Send the token to the user's email
        addEmailtoMailQueue({ ...forgetPasswordMail(token), to: user.email });
        return user;
    } catch (error) {
        console.log("Forget password service error", error);
        if(error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }
        throw error;
    }
}

export const resetPasswordService = async (token, password) => {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if(!decodedToken) {
            throw new ClientError({
                explaination: 'Invalid data sent from the client',
                message: 'Invalid token',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        const user = await userRepository.getById(decodedToken.id);

        if(!user) {
            throw new ClientError({
                explaination: 'Invalid data sent from the client',
                message: 'No registered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        //Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Update the user's password
        const updatedUser = await userRepository.update(user.id, {password: hashedPassword});

        return updatedUser;
    } catch (error) {
        console.log("Reset password service error", error);
        if(error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }
    }
}