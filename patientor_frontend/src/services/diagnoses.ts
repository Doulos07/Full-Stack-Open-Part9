import axios from "axios";
import { Diagnose } from "../types";
import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/diagnoses`;

const getCode = async (code: string) => {
  const { data } = await axios.get<Diagnose>(`${baseUrl}/${code}`);
  return data;
};

export default { getCode };
