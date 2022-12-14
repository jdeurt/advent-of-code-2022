export const loadSolution = (day, part, input) => import(`../../solutions/${day}-${part}.js`).then(({ build }) => build(input));
