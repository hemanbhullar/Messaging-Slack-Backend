import { StatusCodes } from "http-status-codes";

import { signupUserService } from "../service/userService.js";
import { customErrorResponse, internalErrorResponse, successResponse } from "../utils/common/responseObject.js";

export const signup = async (req, res) => {
    try {
        const user = await signupUserService(req.body);
        return res.status(StatusCodes.CREATED).json(
            successResponse(user, 'User created successfully')
        );
    } catch (error) {
        console.log("User controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json(customErrorResponse(error));
        }
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(internalErrorResponse(error));
    }
}