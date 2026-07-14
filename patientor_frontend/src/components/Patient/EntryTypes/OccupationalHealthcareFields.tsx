// HealthCheckFields.tsx
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

interface Props {
  employerName: string;
  setEmployerName: (value: string) => void;

  startDate: string;
  setStartDate: (value: string) => void;

  endDate: string;
  setEndDate: (value: string) => void;
}

const OccupationalHealthcareFields = (props: Props) => {
  return (
    <>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Employer Name"
          variant="outlined"
          value={props.employerName}
          onChange={({ target }) => props.setEmployerName(target.value)}
        />
        <TextField
          fullWidth
          label="Sick Leave Start"
          variant="outlined"
          placeholder="YYYY-MM-DD"
          value={props.startDate}
          onChange={({ target }) => props.setStartDate(target.value)}
        />
        <TextField
          fullWidth
          label="Sick Leave End"
          variant="outlined"
          placeholder="YYYY-MM-DD"
          value={props.endDate}
          onChange={({ target }) => props.setEndDate(target.value)}
        />
      </Stack>
    </>
  );
};

export default OccupationalHealthcareFields;
