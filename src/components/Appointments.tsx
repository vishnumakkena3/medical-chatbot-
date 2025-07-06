import { useState } from "react";
import { appointments as initialAppointments } from "../data/mockData"; // Import initial data

const Appointments = () => {
  // Use state to store and update appointments
  const [appointments, setAppointments] = useState(initialAppointments);

  // Function to add a new appointment (Fixed missing fields)
  type Doctor = {
    id: string;
    name: string;
    specialization: string;
  };
  
  const addAppointment = (doctor: Doctor) => {
    const newAppointment = {
      id: Math.random().toString(), // Generate a unique ID
      userId: "user123", // Dummy user ID (replace with actual user ID if available)
      doctorId: doctor.id || Math.random().toString(), // Generate doctor ID if missing
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date: "2025-03-26", // Default date (modify as needed)
      time: "01:00 PM", // Default time
      status: "scheduled" as "scheduled" | "completed" | "cancelled",
      notes: "New Appointment",
    };

    setAppointments([...appointments, newAppointment]); // Update state
  };

  // Function to remove an appointment by ID
  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  return (
    <div>
      <h2>Appointments</h2>
      <button 
        onClick={() => addAppointment({ id: "doc1", name: "Dr.", specialization: "Cardiology" })} 
        style={{ marginBottom: "10px", padding: "10px", background: "blue", color: "white", border: "none" }}>
        Add Appointment
      </button>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <strong>Doctor:</strong> {appointment.doctorName} <br />
            <strong>Specialization:</strong> {appointment.specialization} <br />
            <strong>Date:</strong> {appointment.date} <br />
            <strong>Time:</strong> {appointment.time} <br />
            <strong>Status:</strong> 
            <span style={{ color: appointment.status === "scheduled" ? "green" : "red" }}>
              {appointment.status}
            </span>
            <br />
            <strong>Notes:</strong> {appointment.notes}
            <br />
            <button 
              onClick={() => removeAppointment(appointment.id)} 
              style={{ marginTop: "5px", color: "white", background: "red", border: "none", padding: "5px" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;