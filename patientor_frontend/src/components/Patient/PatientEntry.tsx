import { useEffect, useState } from "react";
import { Diagnose, Entry } from "../../types";
import diagnoseService from "../../services/diagnoses";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
/*
switch (entry.type) {
    case "Hospital":
      return (
        <div>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {diagnoses.map((diagnose) => (
              <li key={diagnose.code}>
                {diagnose.code} {diagnose.name}
              </li>
            ))}
          </ul>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {diagnoses.map((diagnose) => (
              <li key={diagnose.code}>
                {diagnose.code} {diagnose.name}
              </li>
            ))}
          </ul>
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <p>
            {entry.date} {entry.description}
          </p>
          <ul>
            {diagnoses.map((diagnose) => (
              <li key={diagnose.code}>
                {diagnose.code} {diagnose.name}
              </li>
            ))}
          </ul>
        </div>
      );
    default:
      return assertNever(entry);
  }

*/
interface PropsEntrys {
  entrys: Entry[];
}

interface PropsEntry {
  entry: Entry;
}

const EntryComp = ({ entry }: PropsEntry) => {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) return;
      const results = await Promise.all(entry.diagnosisCodes.map((code) => diagnoseService.getCode(code)));
      setDiagnoses(results);
    };
    fetchDiagnoses();
  }, []);

  console.log(diagnoses);
  return (
    <div>
      <p>
        {entry.date} {entry.description}
      </p>
      <ul>
        {diagnoses.map((diagnose) => (
          <li key={diagnose.code}>
            {diagnose.code} {diagnose.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PatientEntry = ({ entrys }: PropsEntrys) => {
  return (
    <div>
      <h4>entries</h4>

      {entrys.map((e) => (
        <EntryComp entry={e} key={e.id} />
      ))}
    </div>
  );
};

export default PatientEntry;
