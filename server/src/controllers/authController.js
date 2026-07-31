import asyncHandler from "../utils/asyncHandler.js";
import { registerUser, loginUser } from "../services/authService.js";
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

const login = asyncHandler(async (req, res) => {
    const user = await loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        token: generateToken(user._id),
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

export {
    register,
    login,
    getCurrentUser,
};