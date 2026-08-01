import generateSlug from "./generateSlug.js";

const generateUniqueSlug = async (
    text,
    checkSlugExists
) => {

    const baseSlug = generateSlug(text);

    let slug = baseSlug;

    let counter = 1;

    while (await checkSlugExists(slug)) {

        slug = `${baseSlug}-${counter}`;

        counter++;
    }

    return slug;
};

export default generateUniqueSlug;