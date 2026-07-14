import axios from "axios";
import { Entry, NewEntryHealthCheckEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, object);

  return data;
};

const getId = async (patientId: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${patientId}`);
  return data;
};

const addEntries = async (patientId: string, entry: NewEntryHealthCheckEntry) => {
  const { data } = await axios.post<Entry>(`${baseUrl}/${patientId}/entries`, entry);
  return data;
};

export default {
  getAll,
  create,
  getId,
  addEntries,
};
