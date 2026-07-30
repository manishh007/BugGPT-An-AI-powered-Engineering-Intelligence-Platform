import User from "../models/User.js";

const findUserByEmail = (email) => User.findOne({ email });

const createUser = (userData) => User.create(userData);

export {
    findUserByEmail,
    createUser,
};