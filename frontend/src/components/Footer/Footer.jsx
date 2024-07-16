import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
<<<<<<< HEAD
    path: "https://www.youtube.com/",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com/",
=======
    path: "https://www.youtube.com",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com",
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
<<<<<<< HEAD
    path: "https://www.linkedin.com/",
=======
    path: "https://www.linkedin.com",
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Home",
  },
  {
<<<<<<< HEAD
    path: "/about",
=======
    path: "/",
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
<<<<<<< HEAD
=======
  {
    path: "/",
    display: "Blog",
  },
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
];

const quickLinks02 = [
  {
<<<<<<< HEAD
    path: "/findDoctor",
    display: "Find a Doctor",
  },
  {
    path: "/notify",
    display: "Notify your Closed ones",
  },
  {
    path: "/findVolunteer",
    display: "Find a Volunteer",
  },
  {
    path: "/doctors",
    display: "Connect with a Doctor",
=======
    path: "/bookingDoctor",
    display: "Find a Doctor",
  },
  {
    path: "/doctors",
    display: "Request an Appointment",
  },
  {
    path: "/bookingVolunteer",
    display: "Find a Volunteer",
  },
  {
    path: "/",
    display: "Get a Opinion",
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  },
];

const quickLinks03 = [
<<<<<<< HEAD

=======
  {
    path: "/",
    display: "Donate",
  },
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  {
    path: "/contact",
    display: "Contact Us",
  },
];

const Footer = () => {
<<<<<<< HEAD
  const year = new Date().getFullYear();
=======
  //const year = new Date().getFullYear();
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf

  return (
    <footer className="pt-16 pb-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
<<<<<<< HEAD
              Copyright © {year} all rights reserved.
=======

>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className=" w-[36px] h-[36px] rounded-full border border-solid border-[#181A1E] flex  items-center justify-center  group hover:bg-[#0067FF] hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor mb-6">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    className="text-[16px] leading-7 font-[400] text-textColor"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor mb-6">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    className="text-[16px] leading-7 font-[400] text-textColor"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor mb-6">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    className="text-[16px] leading-7 font-[400] text-textColor"
                    to={item.path}
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
