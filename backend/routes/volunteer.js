import {
  adminAuth,
  authenticate,
  volunteerAuth,
  restrict,
} from "../auth/verifyToken.js";
import {
  deleteVolunteer,
  getAllVolunteer,
  getVolunteerProfile,
  getSingleVolunteer,
  updateVolunteer,
} from "../controllers/volunteerController.js";
import express from "express";
// import { createReview } from "../controllers/reviewController.js";
//import reviewRouter from "./review.js";

const router = express.Router();

//router.use("/:doctorId/reviews", reviewRouter);

// get all doctors
router.get("/", getAllVolunteer);
router.get("/:id", getSingleVolunteer);
router.put("/:id", authenticate, volunteerAuth, updateVolunteer);
router.delete("/:id", authenticate, volunteerAuth, deleteVolunteer);
router.get("/profile/me", authenticate, restrict(["volunteer"]), getVolunteerProfile);

export default router;
