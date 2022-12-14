export type Frozen<T> = T extends object
    ? { readonly [K in keyof T]: Frozen<T[K]> }
    : T;
