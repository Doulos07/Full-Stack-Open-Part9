interface ResultExercise {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface valuesExersice {
  exercisesHours: number[];
  target: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsedArgument = (hours: any, target: any): valuesExersice => {
  if (!hours || !target) {
    throw new Error("parameters missing");
  }

  if (!Array.isArray(hours)) {
    throw new Error("malformatted parameters");
  }

  const validTarget = !isNaN(Number(target));
  const validHours = hours.every((h) => !isNaN(Number(h)));

  if (validTarget && validHours) {
    return {
      target: Number(target),
      exercisesHours: hours.map((h) => Number(h)),
    };
  } else {
    throw new Error("malformatted parameters");
  }
};

const parsedArgumentExersice = (argument: string[]): valuesExersice => {
  if (argument.length < 4) throw new Error("Not enough arguments");
  // exerciseCalculator must accept inputs of different lengths.

  const hours = argument.slice(3);
  const validTarget = !isNaN(Number(argument[2]));
  const validHours = hours.every((arg) => !isNaN(Number(arg)));

  if (validTarget && validHours) {
    return {
      target: Number(argument[2]),
      exercisesHours: hours.map((hour) => Number(hour)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateRating = (average: number, target: number): number => {
  if (average >= target) {
    return 3;
  } else if (average >= target * 0.5) {
    return 2;
  } else {
    return 1;
  }
};

const calculateRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return "excellent, you reached your target!";
    case 2:
      return "not too bad but could be better";
    default:
      return "you need to work harder next time";
  }
};

export const calculateExercises = (exercisesHours: number[], target: number): ResultExercise => {
  const trainingDays = exercisesHours.filter((hour) => hour !== 0).length;
  const periodLength = exercisesHours.length;
  const total = exercisesHours.reduce((total, day) => total + day, 0);
  const average = total / periodLength;
  const rating = calculateRating(average, target);

  return {
    periodLength,
    trainingDays,
    success: target < average,
    rating,
    ratingDescription: calculateRatingDescription(rating),
    target,
    average,
  };
};

//const exercisesHours = [3, 0, 2, 4.5, 0, 3, 1];
//const target = 2;
// argument => 2 3 0 2 4.5 0 3 1

try {
  const { exercisesHours, target } = parsedArgumentExersice(process.argv);
  console.log(calculateExercises(exercisesHours, target));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }

  console.log(errorMessage);
}
