import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isSsn = (ssn: string): boolean => {
  return ssn.split("-").length === 2;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).includes(gender as Gender);
};
// Object.values(Gender).map((v) => v.toString()).includes(gender);

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parsedName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing Name");
  }

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing DateOfBirth");
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parsedOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const newPatient: NewPatient = {
      name: parsedName(object.name),
      ssn: parseSsn(object.ssn),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      occupation: parsedOccupation(object.occupation),
      gender: parseGender(object.gender),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
