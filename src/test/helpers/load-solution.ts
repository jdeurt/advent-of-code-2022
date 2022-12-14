import type { SolutionModule } from "../../types/solution.js";

export const loadSolution = (day: number, part: number, input: string) =>
    import(`../../solutions/${day}-${part}.js`).then(
        ({ build }: SolutionModule) => build(input)
    );
