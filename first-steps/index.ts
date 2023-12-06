import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
