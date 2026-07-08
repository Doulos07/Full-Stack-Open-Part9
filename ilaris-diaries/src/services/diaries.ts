import axios from "axios";
import type { DiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  const response = axios.get<DiaryEntry[]>(baseUrl);
  return response.then((r) => r.data);
};

export default { getAll };
