import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
Modal.setAppElement('#root');

const BookingV = () => {
  const urlback = 'http://localhost:5000/api';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setIssue] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
      const loc = await getLocation();
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toLocaleTimeString();

      const data = {
        userid: 1,
        name,
        phone,
        location: loc,
        message,
        dateofservice: date,
        timeofservice: time,
      };

      setFormSubmitted(true);
      await axios.post(`${urlback}/v1/bookit/bookv`, data);

      setName('');
      setPhone('');
      setLocation({ latitude: null, longitude: null });
      setIssue('');
      setSuccessMessage('Request submitted successfully!');

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  return (
<>
      <div style={{ height: '100vh', margin: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="alert alert-success mt-3" 
            role="alert"
          >
            {successMessage}
          </motion.div>
        )}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }} 
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          <h2 className='about' style={{ color: '#ea422b', fontSize: '3vw' }}>Connect with a Doctor</h2>
          <p style={{ color: 'black', fontSize: '1.5em' }}>Connect with a doctor in one click. Provide your data.</p>
        </motion.div>
        <Modal
          isOpen={true}
          onRequestClose={() => {}}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <motion.h3 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Fill Your Details
          </motion.h3>
          <form onSubmit={submit}>
            <div className="mb-3" style={{ width: '100%' }}>
              <label htmlFor="exampleInputName" className="form-label">Name</label>
              <motion.input
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder='Your Name'
                id="exampleInputName"
                style={{ height: '40px', fontSize: '80%' }}
                required
              />
            </div>
            <div className="mb-3" style={{ width: '100%' }}>
              <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
              <motion.input
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                placeholder='+91 00000-00000'
                id="exampleInputPhone"
                style={{ height: '40px', fontSize: '80%' }}
                required
              />
            </div>
            <div className="mb-3" style={{ width: '100%' }}>
              <label htmlFor="exampleInputMessage" className="form-label">Message to Volunteer</label>
              <motion.textarea
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                id="exampleInputMessage"
                rows="4"
                placeholder='Your message'
                style={{ minHeight: '80px', resize: 'vertical', fontSize: '80%' }}
              ></motion.textarea>
            </div>
            <motion.button 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5 }}
              type="submit" 
              className="btn btn-primary" 
              style={{ height: '40px', width: 'auto', marginTop: '1%', lineHeight: '5px' }}
            >
              Submit
            </motion.button>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default BookingV;
