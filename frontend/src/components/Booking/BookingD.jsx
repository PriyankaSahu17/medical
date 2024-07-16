import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');

const BookingD = () => {
  const urlback = 'http://localhost:5000/api';

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

      await axios.post(`${urlback}/v1/bookit/bookd`, data);

      setName('');
      setPhone('');
      setMessage('');
      setSuccessMessage('Request submitted successfully!');
      navigate(`/room/${roomId}`);
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      setModalIsOpen(false); // Close the modal after form submission
    } catch (e) {
      console.error('Error submitting form:', e);
    }
  }

  return (
    // <>
    //   <div style={{ height: '150vh', marginLeft: '5%' }}>
    //     <div>
    //       {successMessage && (
    //         <div className="alert alert-success mt-3" role="alert">
    //           {successMessage}
    //         </div>
    //       )}
    //       <div style={{ top: 0, left: 0, width: '100%', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
    //         <h2 className='about' style={{ color: '#ea422b', fontSize: '3vw' }}>Book a Service</h2>
    //       </div>
    //       <p style={{ marginLeft: '5%', color: 'black', fontSize: '1.5em', marginBottom: '2%' }}>In urgent need? Book our service now and get immediate assistance wherever you are.</p>
    //     </div>
    //     <button onClick={() => setModalIsOpen(true)} className="btn btn-primary">Book a Service</button>
    //     <Modal
    //       isOpen={modalIsOpen}
    //       onRequestClose={() => setModalIsOpen(false)}
    //       style={{
    //         content: {
    //           top: '50%',
    //           left: '50%',
    //           right: 'auto',
    //           bottom: 'auto',
    //           marginRight: '-50%',
    //           transform: 'translate(-50%, -50%)',
    //           width: '80%',
    //           maxHeight: '90vh',
    //           overflowY: 'auto',
    //           padding: '20px',
    //           borderRadius: '10px',
    //           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //         },
    //       }}
    //     >
    //       <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Fill Your Details</h3>
    //       <form onSubmit={submit}>
    //         <div className="mb-3" style={{ width: '100%' }}>
    //           <label htmlFor="exampleInputName" className="form-label">Name</label>
    //           <input
    //             type="text"
    //             value={name}
    //             onChange={(e) => setName(e.target.value)}
    //             className="form-control"
    //             placeholder='Your Name'
    //             id="exampleInputName"
    //             style={{ height: '40px', fontSize: '80%' }}
    //             required
    //           />
    //         </div>
    //         <div className="mb-3" style={{ width: '100%' }}>
    //           <label htmlFor="exampleInputPhone" className="form-label">Contact Number</label>
    //           <input
    //             type="text"
    //             value={phone}
    //             onChange={(e) => setPhone(e.target.value)}
    //             className="form-control"
    //             placeholder='+91 00000-00000'
    //             id="exampleInputPhone"
    //             style={{ height: '40px', fontSize: '80%' }}
    //             required
    //           />
    //         </div>
    //         <div className="mb-3" style={{ width: '100%' }}>
    //           <label htmlFor="exampleInputMessage" className="form-label">Message to Doctor</label>
    //           <textarea
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //             className="form-control"
    //             id="exampleInputMessage"
    //             rows="4"
    //             placeholder='Your message'
    //             style={{ minHeight: '80px', resize: 'vertical', fontSize: '80%' }}
    //           ></textarea>
    //         </div>
    //         <button type="submit" className="btn btn-primary" style={{ height: '40px', width: 'auto', marginTop: '1%', lineHeight: '5px' }}>Submit</button>
    //       </form>
    //     </Modal>
    //   </div>
    // </>
      <>
        <div style={{ height: '100vh', margin: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 className='about' style={{ color: '#ea422b', fontSize: '3vw' }}>Connect with a Doctor</h2>
            <p style={{ color: 'black', fontSize: '1.5em' }}>Connect with a doctor in one click. Provide your data.</p>
          </div>
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Fill Your Details</h3>
            <form onSubmit={submit}>
              <div className="mb-3" style={{ width: '100%' }}>
                <label htmlFor="exampleInputName" className="form-label">Name</label>
                <input
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
                <input
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
                <label htmlFor="exampleInputMessage" className="form-label">Message to Doctor</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-control"
                  id="exampleInputMessage"
                  rows="4"
                  placeholder='Your message'
                  style={{ minHeight: '80px', resize: 'vertical', fontSize: '80%' }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ height: '40px', width: 'auto', marginTop: '1%', lineHeight: '5px' }}>Submit</button>
            </form>
          </Modal>
        </div>
      </>
  );
}

export default BookingD;
