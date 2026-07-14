import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { SyntheticEvent, useState } from "react";
import { Entry, EntryType, NewBaseEntry, NewEntry } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import HealthCheckFields from "./EntryTypes/HealthCheckFields";
import HospitalFields from "./EntryTypes/HospitalFields";
import OccupationalHealthcareFields from "./EntryTypes/OccupationalHealthcareFields";
import BaseEntry from "./EntryTypes/BaseEntry";

interface Props {
  addEntry: (entry: NewEntry) => void;
  diagnosisCodes: string[];
}
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const AddEntryForm = ({ addEntry, diagnosisCodes }: Props) => {
  // BaseEntry states...
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState("");
  const [codes, setCodes] = useState<string[]>([]);

  // TYPE ENTRYS
  const entryTypes: EntryType[] = ["HealthCheck", "Hospital", "OccupationalHealthcare"];
  const [type, setType] = useState<EntryType>("HealthCheck");
  const caseType = type as Entry["type"];

  // Hospital states...
  const [dateHospital, setDateHospital] = useState<Dayjs | null>(dayjs());
  const [criteria, setCriteria] = useState("");

  // HealthCheck states...
  const [healthCheckRating, setRating] = useState(0);

  // Occupational states...
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const resetAll = (): void => {
    setDescription("");
    setDate(dayjs());
    setSpecialist("");
    setCodes([]);
    setDateHospital(dayjs());
    setCriteria("");
    setRating(0);
    setEmployerName("");
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    const formValues: NewBaseEntry = {
      description,
      date: String(date),
      specialist,
      diagnosisCodes: codes,
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
            date: String(dateHospital),
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
            startDate: String(startDate),
            endDate: String(endDate),
          },
          type: "OccupationalHealthcare",
        });
        break;
      default:
        return assertNever(caseType);
    }

    resetAll();
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
          <BaseEntry
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            codes={codes}
            setCodes={setCodes}
            type={type}
            setType={setType}
            diagnosisCodes={diagnosisCodes}
            entryTypes={entryTypes}
          />

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
