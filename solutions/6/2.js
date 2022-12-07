import { getInput } from "../inputs/get-day-input.js";
import { golfedFindMarkerIndex } from "./general.js";

const input = getInput(6);

console.log(golfedFindMarkerIndex(input, 14));
