import express from "express";
import diagnoseServices from "../services/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnoseServices.getAll());
});

router.get("/:id", (req, res) => {
  const code = req.params.id;
  const diagnose = diagnoseServices.getCode(code);

  res.json(diagnose);
});

export default router;
