import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { EntryType } from "../../../types";

interface Props {
  description: string;
  setDescription: (value: string) => void;

  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;

  specialist: string;
  setSpecialist: (value: string) => void;

  codes: string[];
  setCodes: (value: string[]) => void;

  type: EntryType;
  setType: (value: EntryType) => void;

  diagnosisCodes: string[];
  entryTypes: string[];
}

const BaseEntry = (props: Props) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // when value is a comma-separated string (rare), split to array; otherwise use array directly
    props.setCodes(typeof value === "string" ? value.split(",") : value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    slotProps: {
      paper: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    },
  };

  return (
    <>
      <TextField
        fullWidth
        label="description"
        variant="outlined"
        value={props.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.setDescription(e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" value={props.date} onChange={(newDate) => props.setDate(newDate)} />
      </LocalizationProvider>

      <TextField
        fullWidth
        label="specialist"
        variant="outlined"
        value={props.specialist}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.setSpecialist(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel id="diagnosisCodes-label">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodes-label"
          multiple
          value={props.codes}
          onChange={handleChange}
          MenuProps={MenuProps}
          label="Diagnosis Codes"
        >
          {props.diagnosisCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          value={props.type}
          onChange={(event: SelectChangeEvent) => props.setType(event.target.value as EntryType)}
          label="Type"
        >
          {props.entryTypes.map((entryType) => (
            <MenuItem key={entryType} value={entryType}>
              {entryType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default BaseEntry;
