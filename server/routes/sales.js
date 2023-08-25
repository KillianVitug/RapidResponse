import express from "express";
import { getOverall } from "../controllers/sales.js"

const router = express.Router();

router.get("/overall", getOverall)

export default router;