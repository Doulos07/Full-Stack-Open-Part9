import patientsData from "../data/patients";
import { Patient, PatientNonSsn } from "../types";

const getAll = (): Patient[] => patientsData;

const getAllNonSsn = (): PatientNonSsn[] => patientsData.map(({ ssn: _ssn, ...rest }) => rest);
export default { getAll, getAllNonSsn };
