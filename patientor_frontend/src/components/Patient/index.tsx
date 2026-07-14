import { MaleOutlined, FemaleOutlined, TransgenderOutlined } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import patientService from "../../services/patients";
import type { NewEntry, Patient } from "../../types";
import { useParams } from "react-router-dom";
import PatientEntry from "./PatientEntry";
import AddEntryForm from "./AddEntryForm";
import Toggleable from "../Toggleable";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const Patient = () => {
  const patientID = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ref = useRef(null);

  useEffect(() => {
    if (patientID) {
      patientService.getId(patientID).then((patient) => setPatient(patient));
    }
  }, [patientID]);

  const genderIcons = {
    male: <MaleOutlined fontSize="small" />,
    female: <FemaleOutlined fontSize="small" />,
    other: <TransgenderOutlined fontSize="small" />,
  };

  const addEntry = (data: NewEntry): void => {
    if (patientID && patient) {
      patientService
        .addEntries(patientID, data)
        .then((newEntry) => {
          setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
        })
        .catch((error) => {
          setErrorMessage(error.response?.data?.error ?? "Error al agregar la entrada");
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  if (!patient) return null;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
      <Card variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography variant="h5" fontWeight={600}>
              {patient.name}
            </Typography>
            <Chip icon={genderIcons[patient.gender]} label={patient.gender} size="small" variant="outlined" />
          </Stack>

          <Stack spacing={0.5} sx={{ mt: 1.5, color: "text.secondary" }}>
            <Typography variant="body2">ssn: {patient.ssn}</Typography>
            <Typography variant="body2">occupation: {patient.occupation}</Typography>
          </Stack>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Toggleable ref={ref} showLabel="New entry" hideLabel="CANCEL">
            <AddEntryForm addEntry={addEntry} />
          </Toggleable>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <PatientEntry entrys={patient.entries} />
    </Box>
  );
};

export default Patient;
