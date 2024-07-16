import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
const BookingD = () => {
  

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const generateRoomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';
    for (let i = 0; i < 12; i++) {
        roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
};

  async function submit(e) {
    e.preventDefault();

    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString();
      const roomId = generateRoomId();
      const data = {
        userid: 1,
        name,
        phone,
        message,
        dateofservice: date,
        timeofservice: time,
        roomId
      };

      await axios.post(`${BASE_URL}/bookit/bookd`, data);

      setName('');
      setPhone('');
      setMessage('');
      //setSuccessMessage('Request submitted successfully!');
      navigate(`/room/${roomId}`);
      setTimeout(() => {
        //setSuccessMessage('');
      }, 5000);
 // Close the modal after form submission
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  return (
    <section>
    <div className="px-4 mx-auto max-w-screen-md">
      <h2 className="heading text-center ">Connect with a Doctor</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text__para">
      Connect with a doctor in one click. Provide your data. Fill Your Details
      </p>
      <form onSubmit={submit} className="space-y-8">
        <div>
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form__input mt-1"
                placeholder='Your Name'
                id="exampleInputName"
                required
              />
        </div>
        <div>
        <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
        <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form__input mt-1"
                placeholder='+91 00000-00000'
                id="exampleInputPhone"
                required
              />
        </div>
        <div className="sm:col-span-2">
        <label htmlFor="exampleInputMessage" className="form-label">Message to Doctor</label>
        <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form__input mt-1"
                id="exampleInputMessage"
                rows="4"
                placeholder='Your message'
                ></textarea>
        </div>
        <button type="submit" className="btn  rounded  sm:w-fit  ">
          Find Doctor
        </button>
      </form>
    </div>
  </section>
  );
}

export default BookingD;
