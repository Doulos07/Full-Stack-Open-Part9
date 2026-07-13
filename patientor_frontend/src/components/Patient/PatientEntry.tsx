import { useEffect, useState } from "react";
import { Diagnose, Entry } from "../../types";
import diagnoseService from "../../services/diagnoses";
import SpecificEntry from "./SpecificEntry";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

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
    <div style={{ border: "solid", borderRadius: "5px", padding: "5px", marginBottom: "10px" }}>
      <p>
        {entry.date} <MedicalServicesIcon />
      </p>
      <p>{entry.description}</p>
      <SpecificEntry entry={entry} />
      {diagnoses.length > 0 && <h4>Diagnoses</h4>}

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
      <h3>entries</h3>

      {entrys.map((e) => (
        <EntryComp entry={e} key={e.id} />
      ))}
    </div>
  );
};

export default PatientEntry;
