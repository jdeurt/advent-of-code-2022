export const chain = (value) => {
    const then = (nextFn) => chain(nextFn(value));
    return { then, value };
};
