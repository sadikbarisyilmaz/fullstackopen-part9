import express from "express";
import { typedDiagnoses } from "../services/diagnosesService";

export const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.send(typedDiagnoses);
});

diagnosesRouter.post("/", (_req, res) => {
  res.send("Saving a diagnose!");
});
