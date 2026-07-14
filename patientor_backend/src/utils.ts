import { Discharge, Diagnose, Gender, NewEntry, NewPatient, HealthCheckRating, NewBaseEntry, Entry } from "./types";

// =============================== VALIDATION TYPE ===============================
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

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

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing Date");
  }

  return date;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

// =============================== PARSED PATIENT ===============================

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

export const toNewPatient = (object: unknown): NewPatient => {
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

// =============================== PARSED ENTRY ===============================
const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose["code"]> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    return [] as Array<Diagnose["code"]>;
  }

  return diagnosisCodes as Array<Diagnose["code"]>;
};

const parsedDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }

  return description;
};

const parsedSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }

  return specialist;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing criteria");
  }

  return criteria;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !("date" in discharge) || !("criteria" in discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseCriteria(discharge.criteria),
  };
};

const parseEmployerName = (employe: unknown): string => {
  if (!employe || !isString(employe)) {
    throw new Error("Incorrect or missing employe");
  }

  return employe;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== "object" || !("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new Error("Incorrect or missing sickLeave");
  }

  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};

const isHealthCheckRating = (healthCheckRating: number): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return healthCheckRating;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("description" in object && "date" in object && "specialist" in object && "diagnosisCodes" in object && "type" in object) {
    const baseEntry: NewBaseEntry = {
      description: parsedDescription(object.description),
      date: parseDate(object.date),
      specialist: parsedSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };

    const entryType = object.type as Entry["type"];
    switch (entryType) {
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Incorrect data: discharge missing");
        }
        return {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge), // tenés que crear este parser
        };
      case "OccupationalHealthcare":
        if (!("employerName" in object) || !("sickLeave" in object)) {
          throw new Error("Incorrect or missing data");
        }
        return {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Incorrect or missing data");
        }
        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      default:
        assertNever(entryType);
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
