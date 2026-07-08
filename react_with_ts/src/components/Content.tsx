import type { CoursePart } from "../types";
import Part from "./Part";

interface Props {
  parts: CoursePart[];
}
const Content = (props: Props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <div key={part.name}>
          <h2>
            {part.name} {part.exerciseCount}
          </h2>
          <Part course={part} />
        </div>
      ))}
    </div>
  );
};

export default Content;
