import express from "express";
import { PredictNow } from "../Controllers/PredictsController";
const router = express.Router();

router.post("/create-prediction/:id/:matchId", PredictNow);

export default router;
