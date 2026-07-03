interface valuesBmi {
  height: number;
  weight: number;
}

const parsedArgumentBmi = (argument: string[]): valuesBmi => {
  if (argument.length < 4) throw new Error("Not enough arguments");
  if (!isNaN(Number(argument[2])) && !isNaN(Number(argument[3]))) {
    return {
      height: Number(argument[2]),
      weight: Number(argument[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const heightMeter = height / 100;
  const bmi = weight / Math.pow(heightMeter, 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

try {
  const { height, weight } = parsedArgumentBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += `Error: ${error.message}`;
  }

  console.log(errorMessage);
}

export default calculateBmi;
