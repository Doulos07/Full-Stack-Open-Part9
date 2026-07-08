import type { DiaryEntry } from "../types";

interface PropsList {
  diarys: DiaryEntry[];
}

interface DiaryProps {
  diary: DiaryEntry;
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <p>weather: {diary.weather}</p>
      <p>visibility: {diary.visibility}</p>
    </div>
  );
};

const DiaryList = (props: PropsList) => {
  return (
    <div>
      {props.diarys.map((d) => (
        <Diary key={d.id} diary={d} />
      ))}
    </div>
  );
};

export default DiaryList;
