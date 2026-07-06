import express from "express";
import diagnoseServices from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnoseServices.getAll());
});

export default router;
