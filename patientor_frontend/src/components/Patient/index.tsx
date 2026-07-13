import { MaleOutlined, FemaleOutlined, TransgenderOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import patientService from "../../services/patients";
import type { Patient } from "../../types";
import { useParams } from "react-router-dom";
import PatientEntry from "./PatientEntry";

const Patient = () => {
  const patientID = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    if (patientID) {
      patientService.getId(patientID).then((patient) => setPatient(patient));
    }
  }, [patientID]);

  const genderIcons = {
    male: <MaleOutlined />,
    female: <FemaleOutlined />,
    other: <TransgenderOutlined />,
  };

  if (!patient) return null;

  return (
    <div>
      <h2>
        {patient.name} {genderIcons[patient.gender]}
      </h2>

      <p>ssh: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <PatientEntry entrys={patient.entries} />
    </div>
  );
};

export default Patient;
