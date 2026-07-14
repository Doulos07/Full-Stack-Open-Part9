// HealthCheckFields.tsx
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";

interface Props {
  dateHospital: string;
  setDateHospital: (value: string) => void;

  criteria: string;
  setCriteria: (value: string) => void;
}

const HospitalFields = (props: Props) => {
  return (
    <>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Discharge Date"
          variant="outlined"
          placeholder="YYYY-MM-DD"
          value={props.dateHospital}
          onChange={({ target }) => props.setDateHospital(target.value)}
        />
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
