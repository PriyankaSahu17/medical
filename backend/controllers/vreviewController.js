import Review from "../models/ReviewSchema.js";
import Volunteer from "../models/VolunteerSchema.js";

// getAll Review
export const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({
      success: true,
      message: "Successful",
      data: reviews,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const createReview = async (req, res) => {
  if (!req.body.Volunteer) req.body.Volunteer = req.params.VolunteerId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    await Volunteer.findByIdAndUpdate(req.body.Volunteer, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
