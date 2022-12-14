export const stringBuilder = (base) => {
    return {
        append: (str) => stringBuilder((base + str)),
        value: base,
    };
};
