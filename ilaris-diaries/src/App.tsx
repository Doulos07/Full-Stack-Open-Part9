import type { DiaryEntry } from "./types";
import { useState, useEffect } from "react";
import diarieServices from "./services/diaries";
import DiaryList from "./components/DiaryList";

const App = () => {
  const [diarys, setDiarys] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diarieServices.getAll().then((data) => setDiarys(data));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <DiaryList diarys={diarys} />
    </div>
  );
};

export default App;
