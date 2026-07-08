import type { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

interface Props {
  course: CoursePart;
}

const Part = (props: Props) => {
  switch (props.course.kind) {
    case "basic":
      return <p>{props.course.description}</p>;
    case "group":
      return <p>proyect exercise {props.course.groupProjectCount}</p>;
    case "background":
      return (
        <div>
          <p>{props.course.description}</p>
          <p> submit to {props.course.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>{props.course.description}</p>
          <p>Required skills: {props.course.requirements.join(", ")}</p>
        </div>
      );

    default:
      return assertNever(props.course);
  }
};

export default Part;
