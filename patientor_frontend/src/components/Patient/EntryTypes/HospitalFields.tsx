// HealthCheckFields.tsx
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props {
  dateHospital: Dayjs | null;
  setDateHospital: (value: Dayjs | null) => void;

  criteria: string;
  setCriteria: (value: string) => void;
}

const HospitalFields = (props: Props) => {
  return (
    <>
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date discharge" value={props.dateHospital} onChange={(newDate) => props.setDateHospital(newDate)} />
        </LocalizationProvider>

        <TextField
          fullWidth
          label="Criteria"
          variant="outlined"
          value={props.criteria}
          onChange={({ target }) => props.setCriteria(target.value)}
        />
      </Stack>
    </>
  );
};

export default HospitalFields;
