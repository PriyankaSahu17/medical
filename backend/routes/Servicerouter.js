import express from "express"
import findDoctor from "../controllers/servicecontrollerd.js";
import findVolunteer from "../controllers/servicecontrollerv.js";
const router = express.Router();
router.post('/bookd', findDoctor);
router.post('/bookv',findVolunteer);
export default router;
