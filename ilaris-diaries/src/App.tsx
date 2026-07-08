import type { DiaryEntry, NewDiaryEntry } from "./types";
import { useState, useEffect } from "react";
import diarieServices from "./services/diaries";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diarys, setDiarys] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diarieServices.getAll().then((data) => setDiarys(data));
  }, []);

  const diaryCreation = (newDiary: NewDiaryEntry) => {
    diarieServices
      .create(newDiary)
      .then((data) => {
        setDiarys(diarys.concat(data));
      })
      .catch((error) => {
        console.log("error:", error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <div>
      {errorMessage && <h2 style={{ color: "red" }}>{errorMessage}</h2>}
      <DiaryForm diaryCreation={diaryCreation} />
      <h2>Diary entries</h2>
      <DiaryList diarys={diarys} />
    </div>
  );
};

export default App;
