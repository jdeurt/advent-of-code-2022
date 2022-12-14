export type SolutionRunner = () => string | number;
export type SolutionBuilder = (input: string) => SolutionRunner;
export type SolutionModule = { build: SolutionBuilder };
