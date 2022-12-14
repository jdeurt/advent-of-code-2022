export const stringBuilder = <T extends string>(base: T) => {
    return {
        append: <A extends string>(str: A) =>
            stringBuilder((base + str) as `${T}${A}`),
        value: base,
    };
};
