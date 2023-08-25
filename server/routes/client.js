import express from "express";
import { getStations, getCustomers, getReports } from "../controllers/client.js"

const router = express.Router();

router.get("/stations", getStations);
/* 
router.get("/stations/:id", getStation);
router.post("/stations", createStation);
router.put("/stations/:id", updateStation);
router.delete("/stations/:id", deleteStations);
*/
router.get("/customers", getCustomers);
router.get("/reports", getReports)

export default router;