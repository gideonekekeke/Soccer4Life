import express from "express";
import {
	AdminKickOffMatch,
	AdminUpdateScore,
	createMatch,
	GetMatches,
	GetSingleMatch,
} from "../Controllers/MatchController";
const router = express.Router();

router.post("/create-match/:id/now", createMatch);
router.patch("/kickoff/:id/:matchId", AdminKickOffMatch);
router.patch("/updatescore/:id/:matchId", AdminUpdateScore);
router.get("/:id", GetSingleMatch);
router.get("/", GetMatches);

export default router;
