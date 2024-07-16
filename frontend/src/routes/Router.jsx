import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Doctors from "../pages/Doctors/Doctors";
import Services from "../pages/Services";
<<<<<<< HEAD
import About from "../components/About/About";
import MyAccount from "../Dashboard/User-Account/MyAccount";
import MyAccount1 from "../Dashboard/Volunteer-Account/MyAccount";
import Dashboard from "../Dashboard/Doctor-Account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Contact from "../pages/Contact";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import BookingD from "../pages/BookingD";
import BookingV from "../pages/BookingV";
import HomePage from "../pages/HomePage";
import RoomPage from "../pages/RoomPage";
import NotifyContact from "../pages/Notify";
=======
import MyAccount from "../Dashboard/User-Account/MyAccount";
import MyAccount1 from "../Dashboard/User-Account copy/MyAccount";
import Dashboard from "../Dashboard/Doctor-Account/Dashboard";
import Dashboard1 from "../Dashboard/Volunteer-Account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Contact from "../pages/Contact";

import UserNotifications from "../components/Notifications/Notifications";
import BookingD from "../components/Booking/BookingD";
import BookingV from "../components/Booking/BookingV";
import HomePage from "../pages/pages/Home";
import RoomPage from "../pages/pages/Room";
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/services" element={<Services />} />
<<<<<<< HEAD
      <Route path="/findDoctor" element={<BookingD />} />
      <Route path="/vHome" element={<HomePage/>} />
      <Route path="/room/:roomId" element={<RoomPage/>}/>
      <Route path="/findVolunteer" element={<BookingV/>}/>
=======
      
      <Route path="/bookingDoctor" element={<BookingD/>} />
      <Route path="/bookingVolunteer" element={<BookingV/>}/>
      <Route path="/vHome" element={<HomePage/>} />
      <Route path="/room/:roomId" element={<RoomPage/>}/>
      
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
      
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
<<<<<<< HEAD
      <Route
        path="/notify"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <NotifyContact />
          </ProtectedRoute>
        }
      />
=======
      <Route path='user/notification' element={<UserNotifications/>}/>
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteers/profile/me"
        element={
          <ProtectedRoute allowedRoles={["volunteer"]}>
            <MyAccount1 />
          </ProtectedRoute>
        }
      />
<<<<<<< HEAD

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
=======
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      {<Route path="/contact" element={<Contact/>} /> }
>>>>>>> fbc8dfd1dc1e8142d05458c7d646053f0b1a6dbf
    </Routes>
  );
};

export default Router;
