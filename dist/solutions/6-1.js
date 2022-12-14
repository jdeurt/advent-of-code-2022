function areAllElementsUnique(arr) {
    // Sets will remove non-unique elements from any iterable supplied in the constructor
    // If the size of the set is the same as the length of the array, we know that no elements were
    // removed, thus all elements are unique
    return new Set(arr).size === arr.length;
}

function findMarkerIndex([...input], requiredUniqueCharCount) {
    // We know from the prompt that the position of the marker can never be less than the amount of
    // unique characters required to be present before a marker
    const preMarkerChars = input.splice(0, requiredUniqueCharCount);

    let index = requiredUniqueCharCount;

    // Since we used `<Array>.splice`, input no longer contains the first X characters used above
    for (const char of input) {
        if (areAllElementsUnique(preMarkerChars)) {
            break;
        }

        preMarkerChars.shift();
        preMarkerChars.push(char);

        index++;
    }

    return index;
}

export function build(input) {
    return function run() {
        return findMarkerIndex(input, 4);
    };
}
