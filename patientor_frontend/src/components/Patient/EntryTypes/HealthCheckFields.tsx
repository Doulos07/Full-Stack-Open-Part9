// HealthCheckFields.tsx
import TextField from "@mui/material/TextField";

interface Props {
  healthCheckRating: number;
  onChangeRating: (value: string) => void;
}

const HealthCheckFields = ({ healthCheckRating, onChangeRating }: Props) => {
  return (
    <TextField
      fullWidth
      label="healthCheckRating"
      variant="outlined"
      value={healthCheckRating}
      onChange={(e) => onChangeRating(e.target.value)}
    />
  );
};

export default HealthCheckFields;
