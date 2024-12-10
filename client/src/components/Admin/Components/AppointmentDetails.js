import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AppointmentDetails.css";

const AppointmentDetails = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchConfirmedAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/confirmed");
        setAppointments(response.data); // Populate the appointments state
      } catch (error) {
        console.error("Error fetching confirmed appointments:", error.message);
      }
    };

    fetchConfirmedAppointments();
  }, []);

  return (
    <div className="admin-appointments">
      <h2>Confirmed Appointments</h2>
      {appointments.length === 0 ? (
        <p>No confirmed appointments available.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-header">
                <h3>{appointment.fullName}</h3>
                <p>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: "green" }}>{appointment.appointmentStatus}</span>
                </p>
              </div>
              <div className="appointment-details">
                <p><strong>Contact:</strong> {appointment.contactNumber}</p>
                <p><strong>Date:</strong> {new Date(appointment.preferredDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.preferredTimeSlot}</p>
                <p><strong>Doctor:</strong> {appointment.preferredDoctor}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentDetails;
