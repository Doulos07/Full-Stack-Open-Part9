import express from "express";
import patientsServices from "../services/patients";
import toNewPatient from "../utils";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsServices.getAllNonSensitive());
});

router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  res.json(patientsServices.getPatientId(patientId));
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body) as Patient;
    const addPatient = patientsServices.addPatient(newPatient);

    res.json(addPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
