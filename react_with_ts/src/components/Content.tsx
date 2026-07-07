interface Parts {
  name: string;
  exerciseCount: number;
}

interface Props {
  parts: Parts[];
}
const Content = (props: Props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
