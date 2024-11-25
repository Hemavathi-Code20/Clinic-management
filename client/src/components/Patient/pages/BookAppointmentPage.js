import React, { useEffect, useState } from "react";
import axios from "axios";
import BookAppointment from "../Components/BookAppointment";

const BookAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch the patient's booked appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/patient/bookappointments");
      console.log("Appointments fetched:", response.data); // Log to check the data returned
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Update the status of the appointment directly in the UI (optimistic UI update)
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment._id === id
          ? { ...appointment, status: newStatus }
          : appointment
      )
    );
  };

  return (
    <div>
      <h1>Patient Portal</h1>
      <BookAppointment fetchAppointments={fetchAppointments} />

      <h2>Your Booked Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table style={{ width: "100%", border: "1px solid #ccc", marginTop: "20px", padding: "10px" }}>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.status || "Pending"}</td>
                {/* Add status update buttons if the appointment is not confirmed or canceled */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookAppointmentPage;
