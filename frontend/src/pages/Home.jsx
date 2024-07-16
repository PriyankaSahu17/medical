<<<<<<< HEAD
import { Link } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import About from "../components/About/About.jsx";
import faqImg from "../assets/images/faq-img.png";
import { BsArrowRight } from "react-icons/bs";

=======
import { Link, useNavigate } from "react-router-dom";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";

import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";

import faqImg from "../assets/images/faq-img.png";
import { BsArrowRight } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext.jsx";
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
import ServicesList from "../components/Services/ServicesList";
import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import DoctorsList from "../components/Doctors/DoctorsList";
import Testimonial from "../components/Testimonial/Testimonial";
import FaqList from "../components/Faq/FaqList";
<<<<<<< HEAD

const Home = () => {
=======
import { useContext } from "react";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClicke = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Send notification to the doctor
    try {
      const response = await fetch("https://localhost:5000//api/v1/notifydoctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
        }),
      });

      if (response.ok) {
        alert("Notification sent to the doctor");
      } else {
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification", error);
      alert("An error occurred. Please try again later.");
    }
  };

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ====== hero content ========== */}
            <div>
              <div className=" lg:w-[570px]">
<<<<<<< HEAD
                <h1 className="text-headingColor text-[36px] leading-[46px] md:text-[60px] md:leading-[70px] font-[800] ">
                We specialize in saving lives during critical health emergencies.
                </h1>
                <p className="text__para">
                Specializing in critical health emergencies, 
                we are dedicated to saving lives with timely, 
                expert care and support for every patient.
                </p>
                <button className="btn" onClick={() => window.location.href = '/notify'}>Notify Emergency</button>
=======
                <h1 className="text-headingColor text-[26px] leading-[46px] md:text-[60px] md:leading-[70px] font-[800] ">
                We ensure you receive the care you need.
                </h1>
                <p className="text__para">
                Our mission is to provide immediate emergency health support,
                connecting patients with nearby volunteers and doctors,
                and offering first aid guidance through our chatbot, ensuring 
                timely care for a healthier, safer life.
                </p>
                {/* <button onClick={handleClicke} className="btn">
                  Request an Appointment
                </button> */}
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
              </div>

              <div className="mt-[30px] lg:mt-[70px] flex flex-col md:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
<<<<<<< HEAD
                    45+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-yellowColor block mt-[-14px]"></span>
                  <p className="text__para">Doctors to Connect</p>
=======
                    100+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-yellowColor block mt-[-14px]"></span>
                  <p className="text__para">volunteers at your Service</p>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
<<<<<<< HEAD
                    100+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-purpleColor block mt-[-14px]"></span>
                  <p className="text__para">Active Health Volunteers</p>
=======
                    45+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-purpleColor block mt-[-14px]"></span>
                  <p className="text__para">Doctors to connect</p>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    1120+
                  </h2>
                  <span className="w-[100px] h-2 rounded-full bg-irisBlueColor block mt-[-14px]"></span>
                  <p className="text__para">Life Saved</p>
                </div>
              </div>
            </div>

            {/* =========== hero img ============ */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="hero_img" />
              </div>
              <div className="mt-[30px]">
                <img
                  className="w-full mb-[30px]"
                  src={heroImg02}
                  alt="hero_img"
                />
                <img className="w-full" src={heroImg03} alt="hero_img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container ">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Providing the best medical services
            </h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon01} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Find a Doctor
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>

                <Link
<<<<<<< HEAD
                  to="/findDoctor"
=======
                  to="/doctors"
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon02} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
<<<<<<< HEAD
                  Find a Volunteer
=======
                  Find a Location
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>

                <Link
<<<<<<< HEAD
                  to="/findVolunteer"
=======
                  to="/vHome"
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5 ">
              <div className="flex items-center justify-center">
                <img src={icon03} alt="" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  Book Appointment
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                  World-class care for everyone. Our health System offers
                  unmatched, expert health care. From the lab to the clinic.
                </p>

                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-buttonBgColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <About />

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our medical services</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
=======
      {/* =========== Services ============= */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Medical Services</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care. From the lab to the clinic.
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
            </p>
          </div>

          <ServicesList />
        </div>
      </section>

<<<<<<< HEAD
      <section>
        <div className="container">
          <div className="flex justify-between items-center flex-col lg:flex-row">
            {/* =========== feature content ============ */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get virtual treatment <br /> anytime.
              </h2>
              <ul className="pl-4">
                <li className="text__para ">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para ">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">
                  3. View our physicians who are accepting new patients, use the
                  online scheduling tool to select an appointment time.
                </li>
=======
      {/* =========== feature section =========== */}
      <section>
        <div className="container">
          <div className="md:flex justify-between items-center">
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get virtual treatment <br /> any time.
              </h2>
              <ul className="pl-4">
                <li className="text__para">
                  1. Schedule the appointment directly.
                </li>
                <li className="text__para">
                  2. Search for your physician here, and contact their office.
                </li>
                <li className="text__para">3. View our physicians.</li>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
              </ul>
              <Link to="/">
                <button className="btn">Learn More</button>
              </Link>
            </div>

<<<<<<< HEAD
            {/* ========= feature img ======== */}
            <div className="relative z-10  xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="about_img" />

              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0  md:bottom-[100px]  md:left-[20px] z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 font-[600] text-headingColor">
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 font-[400] text-textColor">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded-[4px] py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="" />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] rounded-full  text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 font-[500] text-irisBlueColor mt-2 lg:mt-4 ">
                  Consultation
                </div>

                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
=======
            <div className="mt-4 md:mt-0 flex gap-[30px] justify-end">
              <div>
                <img src={featureImg} alt="" />
              </div>

              <div className="mt-[30px]">
                <img src={videoIcon} className="mb-[30px]" alt="" />
                <img src={avatarIcon} alt="" />
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
              </div>
            </div>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our great doctors</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
=======
      {/* =========== Doctors section ============ */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our Great Doctors</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care. From the lab to the clinic.
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
            </p>
          </div>

          <DoctorsList />
        </div>
      </section>

<<<<<<< HEAD
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions by our beloved patients
              </h2>

              <FaqList />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
=======
      {/* =========== testimonial section ============ */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care. From the lab to the clinic.
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
<<<<<<< HEAD
=======

      {/* =========== faq section ============ */}
      <section>
        <div className="container">
          <div className="flex flex-col lg:flex-row justify-between gap-[30px]">
            <div className="lg:w-1/2">
              <h2 className="heading">Most questions by our beloved patients</h2>

              <FaqList />
            </div>

            <div className="lg:w-1/2">
              <img src={faqImg} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* =========== footer ============= */}
      <footer className="pb-[30px]">
        <div className="container">
          <div className="sm:flex justify-between gap-[30px]">
            <div className="sm:w-1/2">
              <h2 className="text-[26px] leading-[30px] text-headingColor font-[700] mb-[30px]">
                Meditopia
              </h2>
              <p className="text-[16px] leading-7 text-textColor font-[400]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
                dolore atque recusandae consequatur quisquam ipsam id
                perferendis? Laudantium dolorum doloremque dignissimos velit
                culpa amet ducimus tempora!
              </p>
            </div>

            <div className="sm:w-1/2">
              <h2 className="text-[20px] leading-[30px] text-headingColor font-[700] mb-[30px]">
                Subscribe to our newsletter
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  className="py-3 px-4 focus:outline-none rounded-[50px]"
                  placeholder="Email"
                />
                <button className="bg-primaryColor text-white py-3 px-4 rounded-[50px] font-[700] text-[16px] leading-6">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <p className="text-[16px] leading-7 text-textColor font-[400] mt-[40px] text-center">
            Copyright 2023, developed by IT. All rights reserved.
          </p>
        </div>
      </footer>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    </>
  );
};

export default Home;
