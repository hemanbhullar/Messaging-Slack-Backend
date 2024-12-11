import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from "../repositories/userRepository.js";
import { createJWT } from '../utils/common/authUtils.js';
// import { generateToken } from '../utils/jwt.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from "../utils/errors/validationError.js";

export const signupUserService = async (user) => {
    try {
        const newUser = await userRepository.create(user);
        return newUser;
    } catch (error) {
        console.log("User service error", error);
        if(error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }
        if(error.name === "MongoServerError" && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with same email or username already exists']
                },
                'A user with same email or username already exists'
            )
        }
        throw error;
    }
}

export const signinUserService = async (userDetails) => {
    try {
        const user = await userRepository.getByEmail(userDetails.email);
        if(!user) {
            throw new ClientError({
                explaination: 'Invalid data sent from the client',
                message: 'No registered user found with this email',
                statusCode: StatusCodes.NOT_FOUND
            })
        }

        //Compare password with the hashed password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid){
            throw new ClientError({
                explaination: 'Invalid data sent from the client',
                message: 'Invalid Password, please try again',
                statusCode: StatusCodes.BAD_REQUEST
            })
        }

        // const token = generateToken({email: user.email, _id: user._id, username: user.username, role: user.role || "user"});

        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            token: createJWT({ id: user.id, email: user.email })
        };
    } catch (error) {
        console.log('User service error', error);
        throw error;
    }
}