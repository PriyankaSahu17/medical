import Booking from "../models/BookingSchema.js";
import Volunteer from "../models/VolunteerSchema.js";

// update Volunteer
export const updateVolunteer = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedVolunteer,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

// delete Volunteer
export const deleteVolunteer = async (req, res) => {
  const id = req.params.id;

  try {
    await Volunteer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};

// getSingle Volunteer
export const getSingleVolunteer = async (req, res) => {
  const id = req.params.id;

  try {
    const Volunteer = await Volunteer.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successful",
      data: Volunteer,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// getAll Volunteer
export const getAllVolunteer = async (req, res) => {
  try {
    const { query } = req.query;
    let Volunteers;

    if (query) {
      // Search based on Volunteer name or specialization
      Volunteers = await Volunteer.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the name field
          { specialization: { $regex: query, $options: "i" } }, // Case-insensitive regex search on the specialization field
        ],
      }).select("-password");
    } else {
      // Get all approved Volunteers
      Volunteers = await Volunteer.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: Volunteers,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getVolunteerProfile = async (req, res) => {
  const userId = req.userId;

  try {
    // let user = null;
    const user = await Volunteer.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const appointments = await Booking.find({ Volunteer: userId });

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully ",
      data: { ...rest, appointments },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong! cannot get!" });
  }
};
