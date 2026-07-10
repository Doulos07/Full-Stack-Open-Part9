import patientsData from "../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Patient[] = patientsData;

const getAll = (): Patient[] => patients;

const getAllNonSensitive = (): NonSensitivePatient[] => patients.map(({ ssn: _ssn, entries: _entries, ...rest }) => rest);

const getPatientId = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient,
    entries: [],
  };

  patients.push(newPatient);

  const { ssn: _ssn, ...NonSensitivePatient } = newPatient;
  void _ssn; // It still throws an error even if I use _ssn.

  return NonSensitivePatient;
};

export default { getAll, getAllNonSensitive, getPatientId, addPatient };
