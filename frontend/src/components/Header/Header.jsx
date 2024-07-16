import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useContext, useEffect, useRef } from "react";

import { AuthContext } from "./../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
<<<<<<< HEAD
    path: "/findVolunteer",
    display: "Find Volunteer",
  },
  {
    path: "/doctors",
    display: "Our Doctors",
  },
  {
    path: "/findDoctor",
    display: "Connect with Doctor",
  },
  {
    path: "/About",
    display: "About Us",
=======
    path: "/services",
    display: "Services",
  },
  {
    path: "/doctors",
    display: "find a Doctor",
  },
  {
    path: "/bookingDoctor",
    display: "connect Doctor",
  },
  {
    path: "/bookingVolunteer",
    display: "Find a Volunteer",
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
  },
  {
    path: "/contact",
    display: "Contact",
<<<<<<< HEAD
  },
=======
  }
  
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
];

const Header = () => {
  const { user, token, role } = useContext(AuthContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header ref={headerRef} className="header flex items-center">
<<<<<<< HEAD
      <div className="container">
=======
      <div className="container" style={{margin:'0'}}>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
        <div className="flex items-center justify-between">
          {/* =========== logo ========== */}
          <div>
            <img src={logo} alt="logo" />
          </div>

          {/* ========== nav menu =========== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={navClass =>
                      navClass.isActive
                        ? "text-[#0067FF] font-[600] text-[16px] leading-7"
                        : "text-textColor font-[500] text-[16px] leading-7"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ========= nav right ========== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                    ? "/doctors/profile/me"
                    : role === "volunteer"
                    ? "/volunteers/profile/me"
                    : "/users/profile/me"
                  } `}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer ">
                    <img
                      className="w-full rounded-full"
                      src={user?.photo}
                      alt=""
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-white font-[600] h-[44px] flex items-center justify-center">
                  Log In
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
