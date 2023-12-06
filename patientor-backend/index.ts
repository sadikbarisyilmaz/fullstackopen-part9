import express from "express";
import cors from "cors";
import { diagnosesRouter } from "./src/routes/diagnoses";
import { patientsRouter } from "./src/routes/patients";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/patients/:id", patientsRouter);

app.listen(3001, () => {
  console.log(`Server running on port ${3001}`);
});
