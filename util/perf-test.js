export const perfTest = (name, fn, knownSolution, iterations = 100) => {
    const result = fn();

    const times = [];

    for (let i = 0; i < iterations; i++) {
        const pStart = performance.now();

        fn();

        const pEnd = performance.now();

        times.push(pEnd - pStart);
    }

    const avgTimeMs = times.reduce((a, b) => a + b) / times.length;

    if (knownSolution === undefined) {
        console.log(`[????] ${name} :: got '${result}' (took ${avgTimeMs} ms)`);
    } else {
        console.log(
            `[${
                String(result) === knownSolution ? "PASS" : "FAIL"
            }] ${name} :: got '${result}' expected '${knownSolution}' (took ${avgTimeMs} ms)`
        );
    }
};
