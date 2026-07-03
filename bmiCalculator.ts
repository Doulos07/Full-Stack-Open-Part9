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

console.log(calculateBmi(180, 74));
