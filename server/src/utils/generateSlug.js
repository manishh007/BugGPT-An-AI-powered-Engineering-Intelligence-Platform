const generateSlug = (text) => {
    return text
        .toLowerCase()                     // BugGPT -> buggpt
        .trim()                            // remove spaces
        .replace(/[^\w\s-]/g, "")          // remove special chars
        .replace(/\s+/g, "-")              // spaces -> -
        .replace(/-+/g, "-");              // multiple - -> single -
};

export default generateSlug;