import asyncHandler from "../utils/asyncHandler.js";
import { registerUser } from "../services/authService.js";
import generateToken from "../utils/generateToken.js";

const register = asyncHandler(async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: generateToken(user._id),
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

export {
    register,
};