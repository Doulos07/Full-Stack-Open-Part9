import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  const response = axios.get<DiaryEntry[]>(baseUrl);
  return response.then((r) => r.data);
};

const create = (newDiary: NewDiaryEntry) => {
  const response = axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.then((r) => r.data);
};

export default { getAll, create };
