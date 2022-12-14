import type { Event } from "benchmark";

export type CycleEventTarget = {
    [K in keyof Event["target"]]-?: NonNullable<Event["target"][K]>;
};
