import type { HospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry, Entry } from "../../types";
import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const getHeartColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return assertNever(rating);
  }
};

export const HospitalEntryComp = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        discharge: {entry.discharge?.date} {entry.discharge?.criteria}
      </p>
    </div>
  );
};

export const HealthCheckEntryComp = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div>
      <p>
        {entry.date} <em>{entry.description}</em>
      </p>
      <FavoriteIcon sx={{ color: getHeartColor(entry.healthCheckRating) }} />
    </div>
  );
};

export const OccupationalHealthCareEntryComp = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
  return (
    <div>
      <p>employer: {entry.employerName}</p>
      <p>Diagnoses by {entry.specialist}</p>
    </div>
  );
};

const SpecificEntry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComp entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareEntryComp entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryComp entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default SpecificEntry;
