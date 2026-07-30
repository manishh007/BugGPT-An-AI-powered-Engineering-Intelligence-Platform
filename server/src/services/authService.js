import ApiError from "../utils/ApiError.js";
import { createUser, findUserByEmail } from "../repositories/userRepository.js";

const registerUser = async (userData) => {
    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }

    const user = await createUser(userData);

    return user;
};

export {
    registerUser,
};