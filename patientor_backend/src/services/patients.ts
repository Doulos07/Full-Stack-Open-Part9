import patientsData from "../data/patients";
import { Patient, PatientNonSsn, NewPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

const patients: Patient[] = patientsData as Patient[];

const getAll = (): Patient[] => patients;

const getAllNonSsn = (): PatientNonSsn[] => patients.map(({ ssn: _ssn, ...rest }) => rest);

const addPatient = (patient: NewPatient): PatientNonSsn => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);

  const { ssn: _ssn, ...patientNonSsn } = newPatient;
  void _ssn; // It still throws an error even if I use _ssn.

  return patientNonSsn;
};

export default { getAll, getAllNonSsn, addPatient };
