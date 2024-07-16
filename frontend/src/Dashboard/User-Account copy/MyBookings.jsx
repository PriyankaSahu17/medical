import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext.jsx';
import './Notification.css';

const Appointments = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);

  const { user } = useContext(AuthContext);
  const userId = user._id;

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/auth/${userId}/notificationvs`);
        const sortedNotifications = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifications(sortedNotifications);
        setNewNotifications(sortedNotifications.filter(notification => !notification.read));
      } catch (error) {
        console.error('Error fetching user notifications:', error);
      }
    };

    fetchUserNotifications();

    const ws = new WebSocket('ws://localhost:8000');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'SERVICE_ASSIGNED' && message.payload.userId === userId) {
        const newNotification = { ...message.payload, isNew: true };
        setNotifications((prev) => [...prev, newNotification]);
        setNewNotifications((prev) => [...prev, newNotification]);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => ws.close();
  }, [userId]);

  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.patch(`http://localhost:5000/api/users/notifications/${notificationId}`, { read: true });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification
        )
      );
      setNewNotifications((prev) => prev.filter((notif) => notif._id !== notificationId));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const date = formatDate(notification.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notification);
    return acc;
  }, {});

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDatee = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleIconClick = (link) => {
    window.location.href = link;
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="overflow-x-auto">
        {Object.keys(groupedNotifications).map((date, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold text-center bg-red-600 text-white py-2 rounded">{formatDatee(date)}</h3>
            <table className="min-w-full bg-white shadow-md rounded my-4">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Time</th>
                  <th className="py-3 px-6 text-left">Message</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {groupedNotifications[date].map((notification, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span>{formatTime(notification.createdAt)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={notification.read ? 'font-normal' : 'font-bold'}>
                        {notification.message}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{notification.name}</td>
                    <td className="py-3 px-6 text-left">{notification.phone}</td>
                    <td className="py-3 px-6 text-center">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        onClick={() => handleIconClick(notification.link)}
                        className="text-red-600 cursor-pointer"
                        size="lg"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
