import diagnosesData from "../data/diagnoses";
import { Diagnose } from "../types";

const getAll = (): Diagnose[] => diagnosesData;

const getCode = (code: string): Diagnose | undefined => diagnosesData.find((d) => d.code === code);
export default { getAll, getCode };
