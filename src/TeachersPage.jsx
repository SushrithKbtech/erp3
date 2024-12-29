import React, { useState } from "react";
import "./styles.css"; // Ensure you apply relevant styles

const TeachersPage = () => {
  const [students, setStudents] = useState([
    {
      name: "John Doe",
      usn: "USN001",
      marks: 85,
      attendance: "95%",
      extracurriculars: ["Football", "Debate"],
    },
    {
      name: "Jane Smith",
      usn: "USN002",
      marks: 78,
      attendance: "89%",
      extracurriculars: ["Music", "Drama"],
    },
  ]);

  return (
    <div className="teachers-page">
      <h1>Teacher's Dashboard</h1>
      <table className="student-table">
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
