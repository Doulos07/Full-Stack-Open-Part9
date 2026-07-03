import express from "express";
import calculateBmi from "./bmiCalculator";

const app = express();

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
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server runnign port ${PORT}`);
});
