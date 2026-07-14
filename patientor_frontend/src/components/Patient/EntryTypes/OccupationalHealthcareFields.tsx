// HealthCheckFields.tsx
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  employerName: string;
  setEmployerName: (value: string) => void;

  startDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;

  endDate: Dayjs | null;
  setEndDate: (value: Dayjs | null) => void;
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Start Date" value={props.startDate} onChange={(newDate) => props.setStartDate(newDate)} />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End Date" value={props.endDate} onChange={(newDate) => props.setEndDate(newDate)} />
        </LocalizationProvider>
      </Stack>
    </>
  );
};

export default OccupationalHealthcareFields;
