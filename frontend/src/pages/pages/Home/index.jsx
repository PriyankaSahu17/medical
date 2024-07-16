// import React, { useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// const generateRoomId = () => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let roomId = '';
//     for (let i = 0; i < 12; i++) {
//         roomId += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return roomId;
// };

// const HomePage = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const roomId = generateRoomId();
//         navigate(`/room/${roomId}`);
//     }, [navigate]);

//     return (
//         <div>
//             <p>Generating room ID and navigating...</p>
//         </div>
//     );
// }

// export default HomePage;
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const generateRoomId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let roomId = '';
  for (let i = 0; i < 12; i++) {
    roomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomId;
};

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const roomId = generateRoomId();
    navigate(`/room/${roomId}`);
    navigate(`/bookingDoctor/$/room/${roomId}`);
  }, [navigate]);
  
//   const openBookingDoctor = () => {
//     window.open(
//       '/bookingDoctor',
//       '_blank',
//       'noopener,noreferrer,width=600,height=400,top=100,left=100'
//     );
//   };

  return (
    <div>
      <p>Generating room ID and navigating...</p>
    </div>
  );
}

export default HomePage;
