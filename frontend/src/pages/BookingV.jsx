import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';

const BookingV = () => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  useEffect(() => {
    // Get user's location on component mount
    getLocation();
  }, []);

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocation(loc);
            resolve(loc);
          },
          (error) => {
            setError('Unable to retrieve your location.');
            reject(error);
          },
          { timeout: 10000 }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
        reject(new Error('Geolocation is not supported by your browser.'));
      }
    });
  }

  async function submit(e) {
    e.preventDefault();

    try {
      const location = await getLocation();
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString();

      const data = {
        userid: 1,
        name,
        phone,
        location: location,
        message,
        dateofservice: date,
        timeofservice: time,
      };

      setFormSubmitted(true);
      await axios.post(`${BASE_URL}/bookit/bookv`, data);

      setName('');
      setPhone('');
      setLocation({ latitude: null, longitude: null });
      setMessage('');
      setSuccessMessage('Request submitted successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  return (
  <section>
    <div className="px-4 mx-auto max-w-screen-md">
      <h2 className="heading text-center ">Find Yourself A Volunteer</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text__para">
      Fill out This form so that our Volunteers can reach out to you.
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
          Find Volunteer
        </button>
      </form>
    </div>
  </section>

  );
}

export default BookingV;
