import type { NewDiaryEntry } from "../types";
import { useState } from "react";

interface DiaryFormProps {
  diaryCreation: (newDiary: NewDiaryEntry) => void;
}

const DiaryForm = ({ diaryCreation }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      visibility,
      weather,
      comment,
    };

    console.log("form:", newDiary);
    diaryCreation(newDiary);

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            date
            <input type="text" value={date} onChange={({ target }) => setDate(target.value)} />
          </label>
        </div>
        <div>
          <label>
            visibility
            <input type="text" value={visibility} onChange={({ target }) => setVisibility(target.value)} />
          </label>
        </div>
        <div>
          <label>
            weather
            <input type="text" value={weather} onChange={({ target }) => setWeather(target.value)} />
          </label>
        </div>
        <div>
          <label>
            comment
            <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
          </label>
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
