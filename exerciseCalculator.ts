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

const parsedArgumentExersice = (argument: string[]): valuesExersice => {
  if (argument.length < 4) throw new Error("Not enough arguments");
  // exerciseCalculator must accept inputs of different lengths.

  return {
    target: Number(argument[2]),
    exercisesHours: argument.slice(3).map((arg) => Number(arg)),
  };
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

const calculateExercises = (exercisesHours: number[], target: number): ResultExercise => {
  const trainingDays = exercisesHours.filter((hour) => hour !== 0).length;
  const periodLength = exercisesHours.length;
  const total = exercisesHours.reduce((total, day) => total + day, 0);
  const average = total / trainingDays;
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
