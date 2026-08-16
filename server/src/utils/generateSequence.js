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
            returnDocument: "after",
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );

    return counter.sequence;
};

export default generateSequence;