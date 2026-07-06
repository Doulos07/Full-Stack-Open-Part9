import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => diagnosesData;

export default { getAll };
