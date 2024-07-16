// import { BASE_URL } from "./../../config";
// import useGetProfile from "../../hooks/useFetchData";
// import HashLoader from "react-spinners/HashLoader";
// import axios from 'axios';
// const NotifyContact = () => {
//     const {
//     data: userData,
//     loading,
//     error,
//   } = useGetProfile(`${BASE_URL}/users/profile/me`);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   userData.Contact?.forEach((item, index) => {
//     if (item && item.Phone) {
//       const message = `
// Hi ${item.Name_of_Contact},

// This is an automated message. ${userData.name} needs immediate help.

// Location: [User's Current Location/Address]

// Please contact ${userData.name} or send help as soon as possible.`;

//       const phoneNumber = item.Phone;
//       console.log(phoneNumber,message);
//       axios.post(`${BASE_URL}/sms/send-sms`, {
//         phoneNumber,
//         message,
        
//       })
//       .then(response => {
//         console.log(`SMS sent to ${phoneNumber}`);
//       })
//       .catch(error => {
//         console.error(`Error sending SMS to ${phoneNumber}:`, error);
//       });
//     } else {
//       console.warn(`Invalid contact information for index ${index}`);
//     }
//   });

//   return (
// <div className="mt-12">
// {loading && (
//         <div className="flex items-center justify-center w-full h-full">
//           <HashLoader color="#0067FF" />
//         </div>
//       )}
//      {error && (
//         <div className="flex items-center justify-center w-full h-full">
//           <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
//             {error}
//           </h3>
//         </div>
//       )}
//         <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex gap-2 items-center">
//           My Contacts 
//         </h3>
//         <ul className="pt-4 md:p-5">
//           {userData.Contact?.map((item, index) => (
//             <li
//               key={index}
//               className="flex sm:justify-between sm:items-end flex-col sm:flex-row  md:gap-5 mb-[30px]"
//             >
//               <div>
//                 {}
//                 <p className="text-[16px] leading-6 font-medium text-textColor">
//                   {item.Name_of_Contact}
//                 </p>
//               </div>
//               <p className="text-[14px] leading-6 font-medium text-textColor">
//                 {item.Phone}
//               </p>
//               <p className="text-[14px] leading-6 font-medium text-textColor">
//                 {item.Relation}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </div>
//   );
// };

// export default NotifyContact;
import { BASE_URL } from "./../../config";
import useGetProfile from "../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotifyContact = () => {
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const notifySMS = (phoneNumber) => {
    toast.success(`SMS sent to ${phoneNumber}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  userData.Contact?.forEach((item, index) => {
    if (item && item.Phone) {
      const message = `
Hi ${item.Name_of_Contact},

This is an automated message. ${userData.name} needs immediate help.

Location: [User's Current Location/Address]

Please contact ${userData.name} or send help as soon as possible.`;

      const phoneNumber = item.Phone;
      console.log(phoneNumber,message);
      axios.post(`${BASE_URL}/sms/send-sms`, {
        phoneNumber,
        message,
      })
      .then(response => {
        console.log(`SMS sent to ${phoneNumber}`);
        notifySMS(phoneNumber); // Call the toast notification
      })
      .catch(error => {
        console.error(`Error sending SMS to ${phoneNumber}:`, error);
        toast.error(`Error sending SMS to ${phoneNumber}`);
      });
    } else {
      console.warn(`Invalid contact information for index ${index}`);
    }
  });

  return (
    <div className="mt-12">
      <ToastContainer />
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          <HashLoader color="#0067FF" />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[20px] font-semibold leading-[30px]">
            {error}
          </h3>
        </div>
      )}
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex gap-2 items-center">
        My Contacts 
      </h3>
      <ul className="pt-4 md:p-5">
        {userData.Contact?.map((item, index) => (
          <li
            key={index}
            className="flex sm:justify-between sm:items-end flex-col sm:flex-row  md:gap-5 mb-[30px]"
          >
            <div>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.Name_of_Contact}
              </p>
            </div>
            <p className="text-[14px] leading-6 font-medium text-textColor">
              {item.Phone}
            </p>
            <p className="text-[14px] leading-6 font-medium text-textColor">
              {item.Relation}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotifyContact;
