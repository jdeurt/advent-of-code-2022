export const softFail = <T extends Promise<unknown>>(p: T) =>
    p.catch(() => undefined) as Promise<T | undefined>;
