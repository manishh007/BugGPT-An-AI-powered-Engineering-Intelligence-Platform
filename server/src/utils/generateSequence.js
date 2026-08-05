import Counter from "../models/Counter.js";

const generateSequence = async (projectId, type) => {
    const counter = await Counter.findOneAndUpdate(
        {
            project: projectId,
            type,
        },
        {
            $inc: {
                sequence: 1,
            },
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );

    return counter.sequence;
};

export default generateSequence;