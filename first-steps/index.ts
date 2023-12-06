import express from "express";
import { calculateBmi } from "./bmiCalculator";
import {
  calculateExercises,
  Target,
  ExerciseHours,
} from "./exerciseCalculator";

const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const response = {
      weight: Number(req.query["weight"]),
      height: Number(req.query["height"]),
      bmi: calculateBmi(
        Number(req.query["height"]),
        Number(req.query["weight"])
      ),
    };
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = req.body;
    const exercises = daily_exercises as ExerciseHours;
    const trgt = target as Target;
    res.send(calculateExercises(exercises, trgt));
  } catch (error) {
    res.send(error.message);
  }
});
// const PORT = 3003;

app.listen(3003, () => {
  console.log(`Server running on port ${3003}`);
});
app.listen(3002, () => {
  console.log(`Server running on port ${3002}`);
});
