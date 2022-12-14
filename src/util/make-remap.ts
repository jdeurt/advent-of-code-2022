export const makeRemap =
    <T extends Record<any, unknown>>(template: T) =>
    <V>(v: V): T[keyof T] | undefined =>
        template[v];
