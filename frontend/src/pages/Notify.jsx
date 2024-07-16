import { BASE_URL } from "./../config";
import useGetProfile from "./../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";
import axios from 'axios';
const NotifyContact = () => {
    const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
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
      })
      .catch(error => {
        console.error(`Error sending SMS to ${phoneNumber}:`, error);
      });
    } else {
      console.warn(`Invalid contact information for index ${index}`);
    }
  });

  return (
<></>
  );
};

export default NotifyContact;
