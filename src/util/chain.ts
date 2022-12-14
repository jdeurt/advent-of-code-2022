export const chain = <T>(value: T) => {
    const then = <U>(nextFn: (using: T) => U) => chain<U>(nextFn(value));

    return { then, value };
};
