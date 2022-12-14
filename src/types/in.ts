export type In<T extends Iterable<unknown>> = T extends Iterable<infer E>
    ? E
    : never;
