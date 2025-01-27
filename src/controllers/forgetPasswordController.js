import { forgetPasswordService, resetPasswordService } from "../service/forgetPasswordService.js";

export const forgetPassword = async (req, res) => {
    try {
        //Find the user by email
        await forgetPasswordService(req.body.email);
        return res.status(200).json({
            message: "Password reset link has been sent to your email"
        });
    } catch (error) {
        console.log("Forget password controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};


export const resetPassword = async (req, res) => {
    try {
        //Find the user by email
        await resetPasswordService(req.params.token, req.body.password);
        return res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log("Reset password controller error", error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                error: error.message
            });
        }
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

