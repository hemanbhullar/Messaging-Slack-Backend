import bcrypt from 'bcrypt';

import userRepository from "../repositories/userRepository.js";
import ValidationError from "../utils/errors/validationError.js";
import { generateToken } from '../utils/jwt.js';

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
            throw{
                status: 404,
                message: "User not found"
            }
        }

        //Compare password
        const isPasswordValid = bcrypt.compareSync(userDetails.password, user.password);

        if(!isPasswordValid){
            throw {
                status: 401,
                message: "Invalid Password"
            }
        }

        const token = generateToken({email: user.email, _id: user._id, username: user.username, role: user.role || "user"});

        return token;
    } catch (error) {
        throw error;
    }
}