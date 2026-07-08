import type { NewDiaryEntry, Visibility, Weather } from "../types";
import { weathers, visibilities } from "../types";
import { useState } from "react";

interface DiaryFormProps {
  diaryCreation: (newDiary: NewDiaryEntry) => void;
}

const DiaryForm = ({ diaryCreation }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("ok");
  const [weather, setWeather] = useState<Weather>("cloudy");
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
    setVisibility("ok");
    setWeather("cloudy");
    setComment("");
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            date
            <input type="date" value={date} onChange={({ target }) => setDate(target.value)} />
          </label>
        </div>

        <div>
          visibility:
          {visibilities.map((v) => (
            <label key={v}>
              <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)} />
              {v}
            </label>
          ))}
        </div>

        <div>
          weather:
          {weathers.map((w) => (
            <label key={w}>
              <input type="radio" name="weather" value={w} checked={weather === w} onChange={() => setWeather(w)} />
              {w}
            </label>
          ))}
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
