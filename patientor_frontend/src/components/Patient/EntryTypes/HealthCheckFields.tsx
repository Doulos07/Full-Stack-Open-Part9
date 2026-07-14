import { HealthCheckRating } from "../../../types";
import { MenuItem, Select } from "@mui/material";

interface Props {
  healthCheckRating: number;
  onChangeRating: (value: string | number) => void;
}

const HealthCheckFields = ({ healthCheckRating, onChangeRating }: Props) => {
  const ratingValues = Object.values(HealthCheckRating).filter((v) => typeof v === "number");

  return (
    <Select value={healthCheckRating} label="Type" onChange={({ target }) => onChangeRating(target.value)}>
      {ratingValues.map((rating) => (
        <MenuItem key={rating} value={rating}>
          {rating}
        </MenuItem>
      ))}
    </Select>
  );
};

export default HealthCheckFields;
