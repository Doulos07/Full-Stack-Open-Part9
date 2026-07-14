import { useField } from "../../hook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { SyntheticEvent } from "react";
import { NewEntryHealthCheckEntry } from "../../types";

interface Props {
  addEntry: (entry: NewEntryHealthCheckEntry) => void;
}

const AddEntryForm = ({ addEntry }: Props) => {
  const [description, resetDescription] = useField("text");
  const [date, resetDate] = useField("text");
  const [specialist, resetSpecialist] = useField("text");
  const [rating, resetRating] = useField("text");
  const [code, resetCode] = useField("text");

  const resetAll = (): void => {
    resetDescription();
    resetDate();
    resetSpecialist();
    resetRating();
    resetCode();
  };

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    const formValues: NewEntryHealthCheckEntry = {
      type: "HealthCheck",
      healthCheckRating: Number(rating.value),
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      diagnosisCodes: code.value.split(","),
    };

    addEntry(formValues);
    resetAll();
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        New HealthCheck Entry
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField fullWidth label="description" variant="outlined" {...description} />
          <TextField fullWidth label="date" variant="outlined" placeholder="YYYY-MM-DD" {...date} />
          <TextField fullWidth label="specialist" variant="outlined" {...specialist} />
          <TextField fullWidth label="healthCheckRating" variant="outlined" {...rating} />
          <TextField fullWidth label="diagnosis codes" variant="outlined" placeholder="ej: M24.2, S62.5" {...code} />

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
