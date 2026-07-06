import express from "express";
import patientsServices from "../services/patients";

const router = express.Router();

router.get("/api/patients", (_req, res) => {
  res.json(patientsServices.getAllNonSsn());
});

export default router;
