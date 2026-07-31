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

const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    return user;
};

export { registerUser, loginUser };