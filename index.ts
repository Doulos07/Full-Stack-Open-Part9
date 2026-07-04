import express from "express";
import calculateBmi from "./bmiCalculator";
import { parsedArgument, calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error("malformatted parameters");
    }

    res.send(calculateBmi(Number(height), Number(weight)));
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: { daily_exercises: any; target: any } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  try {
    const parsed = parsedArgument(daily_exercises, target);
    const result = calculateExercises(parsed.exercisesHours, parsed.target);
    return res.json(result);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    return res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server runnign port ${PORT}`);
});
