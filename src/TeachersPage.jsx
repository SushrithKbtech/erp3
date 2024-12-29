import React, { useState } from "react";
import "./App.css"; // Use your main CSS or create specific styles if needed

const TeachersPage = () => {
  const [students] = useState([
    { name: "John Doe", usn: "USN001", marks: 85, attendance: "95%", extracurriculars: ["Football", "Debate"] },
    { name: "Jane Smith", usn: "USN002", marks: 78, attendance: "89%", extracurriculars: ["Music", "Drama"] },
    { name: "Alice Johnson", usn: "USN003", marks: 92, attendance: "97%", extracurriculars: ["Chess", "Dance"] },
  ]);

  return (
    <div className="teachers-page">
      <h1 className="teachers-title">Teacher's Dashboard</h1>
      <table className="teachers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>USN</th>
            <th>Marks</th>
            <th>Attendance</th>
            <th>Extracurriculars</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.usn}</td>
              <td>{student.marks}</td>
              <td>{student.attendance}</td>
              <td>{student.extracurriculars.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersPage;
