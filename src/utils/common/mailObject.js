import { MAIL_ID } from "../../config/serverConfig.js";

export const workspaceJoinMail = function (workspace) {
    return {
        from: MAIL_ID,
        subject: 'You have been addded to a workspace',
        text: `Congratulations! You have been added to the workspace ${workspace.name}`
    }
}

export const forgetPasswordMail = function (token) {
    return {
        from: MAIL_ID,
        subject: 'Reset your password',
        html: `<h1>Reset Your Password</h1>
        <p>Click on the following link to reset your password:</p>
        <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
        <p>The link will expire in 1hr.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>`,
    }
}