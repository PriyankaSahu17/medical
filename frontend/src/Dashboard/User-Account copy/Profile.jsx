/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";

const Profile = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    photo: null,
    ticketPrice: "",
    role: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    isMedicalProfessional: false,
    qualifications: [],
    profession: "",
    medicalDegreeCertificationUrl: "",
    hasCertification: false,
    certificationUrl: "",
    experiences: [],
    availabilityStatus: "",
    bio: "",
    about: "",
    timeSlots: [],
    reviews: [],
    averageRating: 0,
    totalRating: 0,
    status: true,
    isApproved: "approved",
    location: {
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        photo: userData.photo || "",
        ticketPrice: userData.ticketPrice || "",
        role: userData.role || "",
        address: userData.address || "",
        city: userData.city || "",
        state: userData.state || "",
        country: userData.country || "",
        pincode: userData.pincode || "",
        isMedicalProfessional: userData.isMedicalProfessional || false,
        qualifications: userData.qualifications || [],
        profession: userData.profession || "",
        medicalDegreeCertificationUrl: userData.medicalDegreeCertificationUrl || "",
        hasCertification: userData.hasCertification || false,
        certificationUrl: userData.certificationUrl || "",
        experiences: userData.experiences || [],
        availabilityStatus: userData.availabilityStatus || "",
        bio: userData.bio || "",
        about: userData.about || "",
        timeSlots: userData.timeSlots || [],
        reviews: userData.reviews || [],
        averageRating: userData.averageRating || 0,
        totalRating: userData.totalRating || 0,
        status: userData.status !== undefined ? userData.status : true,
        isApproved: userData.isApproved || "approved",
        location: {
          latitude: userData.location?.latitude || "",
          longitude: userData.location?.longitude || "",
        },
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const fetchGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          location: {
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          },
        });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        toast.error("Error fetching geolocation");
      }
    );
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, isApproved: "approved" }),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error updating profile");
    }
  };

  return (
    <div>
      <form onSubmit={updateUserHandler}>
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            readOnly
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Enter Your Email"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            aria-readonly
          />
        </div>
        <div className="mb-5">
          <input
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            placeholder="Phone Number"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="number"
            value={formData.ticketPrice}
            onChange={handleInputChange}
            name="ticketPrice"
            placeholder="Ticket Price"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.role}
            onChange={handleInputChange}
            name="role"
            placeholder="Role"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            name="address"
            placeholder="Address"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            name="city"
            placeholder="City"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.state}
            onChange={handleInputChange}
            name="state"
            placeholder="State"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            name="country"
            placeholder="Country"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.pincode}
            onChange={handleInputChange}
            name="pincode"
            placeholder="Pincode"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Medical Professional:
            <input
              type="checkbox"
              name="isMedicalProfessional"
              checked={formData.isMedicalProfessional}
              onChange={(e) => setFormData({ ...formData, isMedicalProfessional: e.target.checked })}
              className="ml-2"
            />
          </label>
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.profession}
            onChange={handleInputChange}
            name="profession"
            placeholder="Profession"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.medicalDegreeCertificationUrl}
            onChange={handleInputChange}
            name="medicalDegreeCertificationUrl"
            placeholder="Medical Degree Certification URL"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Certified:
            <input
              type="checkbox"
              name="hasCertification"
              checked={formData.hasCertification}
              onChange={(e) => setFormData({ ...formData, hasCertification: e.target.checked })}
              className="ml-2"
            />
          </label>
        </div>
        <div className="mb-5">
          <input
            type="text"
            value={formData.certificationUrl}
            onChange={handleInputChange}
            name="certificationUrl"
            placeholder="Certification URL"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleInputChange}
            placeholder="Qualifications"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <textarea
            name="experiences"
            value={formData.experiences}
            onChange={handleInputChange}
            placeholder="Experiences"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <p className="text-headingColor font-bold text-[16px] leading-7">Availability Status:</p>
          <select
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor"
          >
            <option value="">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <div className="mb-5">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio (max 50 characters)"
            maxLength="50"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="About"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>
        <div className="mb-5">
          <p className="text-headingColor font-bold text-[16px] leading-7">Current Location:</p>
          <button
            type="button"
            onClick={fetchGeolocation}
            className="w-full bg-[#0067FF] text-white py-2 px-4 rounded-lg mb-2"
          >
            Fetch Current Location
          </button>
          <div>
            <input
              type="text"
              name="latitude"
              value={formData.location.latitude}
              readOnly
              placeholder="Latitude"
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              name="longitude"
              value={formData.location.longitude}
              readOnly
              placeholder="Longitude"
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            />
          </div>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative inline-block w-[130px] h-[50px]">
            <input
              className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              id="customFile"
              name="photo"
              type="file"
              accept=".jpg,.png"
              placeholder="Upload Profile"
              onChange={handleFileInputChange}
            />

            <label
              className="custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              htmlFor="customFile"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
