import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { SyntheticEvent, useState } from "react";
import { Entry, EntryType, NewBaseEntry, NewEntry } from "../../types";
import { MenuItem, Select } from "@mui/material";
import HealthCheckFields from "./EntryTypes/HealthCheckFields";
import HospitalFields from "./EntryTypes/HospitalFields";
import OccupationalHealthcareFields from "./EntryTypes/OccupationalHealthcareFields";

interface Props {
  addEntry: (entry: NewEntry) => void; // Nota: Acá vas a tener que usar el tipo Union completo, no solo HealthCheck
}
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const AddEntryForm = ({ addEntry }: Props) => {
  // BaseEntry states...
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [code, setCode] = useState("");

  // TYPE ENTRYS
  const entryTypes: EntryType[] = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  const [type, setType] = useState<EntryType>("HealthCheck");
  const caseType = type as Entry["type"];

  // Hospital states...
  const [dateHospital, setDateHospital] = useState("");
  const [criteria, setCriteria] = useState("");

  // HealthCheck states...
  const [healthCheckRating, setRating] = useState(0);

  // Occupational states...
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetAll = (): void => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setCode("");
    setDateHospital("");
    setCriteria("");
    setRating(0);
    setEmployerName("");
    setStartDate("");
    setEndDate("");
  };

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    const formValues: NewBaseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: code.split(","),
    };

    switch (caseType) {
      case "HealthCheck":
        addEntry({
          ...formValues,
          healthCheckRating,
          type: "HealthCheck",
        });
        break;
      case "Hospital":
        addEntry({
          ...formValues,
          discharge: {
            date: dateHospital,
            criteria,
          },
          type: "Hospital",
        });
        break;
      case "OccupationalHealthcare":
        addEntry({
          ...formValues,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
          type: "OccupationalHealthcare",
        });
        break;
      default:
        return assertNever(caseType);
    }

    //resetAll();
  };

  const renderSpecificFields = () => {
    switch (caseType) {
      case "HealthCheck":
        return <HealthCheckFields healthCheckRating={healthCheckRating} onChangeRating={(value) => setRating(Number(value))} />;

      case "Hospital":
        return (
          <HospitalFields criteria={criteria} setCriteria={setCriteria} dateHospital={dateHospital} setDateHospital={setDateHospital} />
        );

      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareFields
            employerName={employerName}
            setEmployerName={setEmployerName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        );
      default:
        return assertNever(caseType);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        New Entry
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {/* Campos Base compartidos */}
          <TextField
            fullWidth
            label="description"
            variant="outlined"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            fullWidth
            label="date"
            variant="outlined"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            fullWidth
            label="specialist"
            variant="outlined"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <TextField fullWidth label="diagnosis codes" variant="outlined" value={code} onChange={({ target }) => setCode(target.value)} />

          <Select value={type} label="Type" onChange={({ target }) => setType(target.value as EntryType)}>
            {entryTypes.map((entryType) => (
              <MenuItem key={entryType} value={entryType}>
                {entryType}
              </MenuItem>
            ))}
          </Select>

          {/* Renderizado condicional usando la función */}
          {renderSpecificFields()}

          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 1 }}>
            <Button type="button" variant="outlined" color="inherit" onClick={resetAll}>
              RESET
            </Button>
            <Button type="submit" variant="contained" color="primary">
              ADD
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default AddEntryForm;
