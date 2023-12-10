import express from "express";
import {
  creteNewPatient,
  findById,
  safePatients,
} from "../services/patientsService";

export const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(safePatients);
});

patientsRouter.get("/:id", (req, res) => {
  const patient = findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientsRouter.post("/", (req, res) => {
  try {
    res.send(creteNewPatient(req.body));
  } catch (error) {
    res.status(400).json(error.message);
  }
});
