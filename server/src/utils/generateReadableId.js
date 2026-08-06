const generateReadableId = (prefix, sequence) => {
    return `${prefix}-${String(sequence).padStart(4, "0")}`;
};

export default generateReadableId;