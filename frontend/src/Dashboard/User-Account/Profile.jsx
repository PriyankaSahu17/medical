/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BASE_URL, token } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
<<<<<<< HEAD
import { AiOutlineDelete } from "react-icons/ai";
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
import { toast } from "react-toastify";

const Profile = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
<<<<<<< HEAD
    gender: "",
    bloodType: "",
    photo: null,
    Contact : [],
=======
    password: "",
    gender: "",
    bloodType: "",
    photo: null,
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  });

  useEffect(() => {
    setFormData({
      name: userData.name,
      email: userData.email,
      bloodType: userData.bloodType,
      gender: userData.gender,
      photo: userData.photo,
<<<<<<< HEAD
      Contact : userData.Contact,
=======
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    });
  }, [userData]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const updateUserHandler = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

      toast.success("successfully update");
    } catch (err) {
      console.log(err);
    }
  };
<<<<<<< HEAD
  const addItem = (key, item) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };
  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };
  const handleReuseableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };
  const addContact = e => {
    e.preventDefault();
    addItem("Contact", {
      Name_of_Contact: "",
      Phone: null,
      Relation: "",
    });
  };

  const handleContactChange = (event, index) => {
    handleReuseableInputChangeFunc("Contact", index, event);
  };

  const deleteContact = (e, index) => {
    e.preventDefault();
    deleteItem("Contact", index);
  };
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
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
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5">
          <input
            type="text"
            value={formData.bloodType}
            onChange={handleInputChange}
            name="bloodType"
            placeholder="Blood Group"
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7]">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
<<<<<<< HEAD
        <div className="mb-5">
          <p className="form__label">Contacts*</p>
          {formData.Contact?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Name of Contact</p>
                    <input
                      type="text"
                      name="Name_of_Contact"
                      value={item.Name_of_Contact}
                      className="form__input"
                      onChange={e => handleContactChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Phone No:*</p>
                    <input
                      type="text"
                      name="Phone"
                      value={item.Phone}
                      className="form__input"
                      onChange={e => handleContactChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Relation*</p>
                    <input
                      type="text"
                      name="Relation"
                      value={item.Relation}
                      className="form__input"
                      placeholder="Relation"
                      onChange={e => handleContactChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={e => deleteContact(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addContact}
            className="bg-[#000] py-2 px-5 rounded text-white"
          >
            Add Contact
          </button>
        </div>
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
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
