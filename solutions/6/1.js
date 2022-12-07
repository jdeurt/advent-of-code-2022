import { getInput } from "../inputs/get-day-input.js";
import { findMarkerIndex } from "./general.js";

const input = getInput(6);

console.log(findMarkerIndex(input, 4));
