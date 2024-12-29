import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";
import "./upstyle.css";
import Modal from 'react-modal';

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID
const apiKey = "AIzaSyB_o4pSraDM-fSYlvb5wavKvnd0QAJ7m8Y"; // Replace with your Google API Key
const usnSheetId = "1T-LcbiDLXV-kh7lJNnOxfM46uY-31pCYjVYKpjWACow"; // Replace with your actual sheet ID


// Configuration for multiple sheets
const subjectSheets = [
  { subject: "DBMS", sheetId: "1lGEetDCTBhP3xGLwaH_SNfsqTlG8XqodjsyDsg_ISxQ" },
  { subject: "OS", sheetId: "1Av0rHuf_csr6Nal8Ti8pTKOj8BE0z9YTjeqZGa4Aj9o" },
  { subject: "IEPD SP-1", sheetId: "1dDZeJDDg_AxDjiLwU1CMfZlsA32zxz_yI0r5Qz6uPx0" },
  { subject: "IEPD CIE-1", sheetId: "1dDZeJDDg_AxDjiLwU1CMfZlsA32zxz_yI0r5Qz6uPx0" },
  // Add more sheets here
];

// Fetch USN function placed outside the components for reusability
const fetchUserUsn = async (name) => {
    try {
      const sheetName = "Sheet1"; // Replace with your actual sheet/tab name
      const range = `${sheetName}!A:C`; // Specify range as needed
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${usnSheetId}/values/${range}?key=${apiKey}`;
      const response = await axios.get(url);
  
      if (response.status === 200) {
        const rows = response.data.values;
        const headers = rows[0].map((header) => header.trim()); // Normalize headers
        console.log("Headers from sheet:", headers);
  
        const usnIndex = headers.findIndex((header) => header === "USN");
        const nameIndex = headers.findIndex((header) => header === "Name");
  
        if (usnIndex === -1 || nameIndex === -1) {
          console.error("USN or Name column not found in the sheet");
          return null;
        }
  
        const studentRow = rows.slice(1).find(
          (row) => row[nameIndex]?.trim().toUpperCase() === name.toUpperCase()
        );
  
        return studentRow ? studentRow[usnIndex] : null;
      } else {
        console.error("Failed to fetch data from Google Sheets:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching USN data:", error.message);
      return null;
    }
  };
  // LOGIN COMPONENT
  const Login = () => {
    const navigate = useNavigate();
  
    const handleGoogleSuccess = async (response) => {
      const user = JSON.parse(atob(response.credential.split(".")[1]));
      let email = user.email;
      let name = user.name || "Unknown Name";
      const picture = user.picture || "https://via.placeholder.com/50";
  
      // Clean up the name to remove "BTECH 23" or similar variations
      name = name.replace(/B\s?TECH\s?\d{2}$/i, "").trim();
  
      // Fetch USN data from the Google Sheet
      const userUsn = await fetchUserUsn(name);
  
      const [namePart] = email.split("@");
      const parts = namePart.split(".");
      let course = "Unknown";
      let yearOfJoining = "Unknown";
  
      if (parts.length >= 2) {
        const possibleCourse = parts[1];
        const possibleYear = parts[1].slice(-2);
        const validCourses = ["btech", "bsc", "bda"];
        if (validCourses.includes(possibleCourse.slice(0, -2).toLowerCase())) {
          course = possibleCourse.slice(0, -2).toUpperCase();
          yearOfJoining = `20${possibleYear}`;
        }
      }
  
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name,
          email,
          picture,
          course,
          yearOfJoining,
          usn: userUsn || "Unknown USN",
        })
      );
  
      navigate("/dashboard");
    };
  
  const handleGoogleFailure = (error) => {
    console.error("Login Failed:", error);
    alert("Login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer" className="logo-link">
          <img
            src="https://rvu.edu.in/wp-content/themes/rvu/images/rvu-logo.png"
            alt="RV University Logo"
            className="logo-img"
          />
        </a>
        <header>
          <h1 className="login-title">Welcome to RV University's Portal</h1>
          <p className="login-subtext">Please log in with your Google account to continue.</p>
        </header>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          theme="outline"
          shape="pill"
          text="Login with Google"
          className="google-login"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
      name: "",
      email: "",
      course: "",
      yearOfJoining: "",
      picture: "",
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [attendanceDetails, setAttendanceDetails] = useState({
      subject: "",
      totalDays: 0,
      daysPresent: 0,
      daysAbsent: 0,
      absentDates: [],
    });
    const [subjectAttendance, setSubjectAttendance] = useState([]);
  
    useEffect(() => {
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
      if (!isAuthenticated) {
        navigate("/");
      }
  
      const storedDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (storedDetails) {
        setUserDetails(storedDetails);
  
        const fullName = storedDetails.name.split("BTECH")[0].trim();
        fetchAllAttendance(fullName);
      }
    }, [navigate]);
  
    const fetchAllAttendance = async (name) => {
      try {
        const cleanedName = name.replace(/B\s?TECH\s?\d{2}$/i, "").trim().toUpperCase();
        const attendanceData = [];
  
        for (const { subject, sheetId } of subjectSheets) {
          const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Attendance?key=${apiKey}`;
          const response = await axios.get(url);
  
          if (response.status !== 200) continue;
  
          const rows = response.data.values;
          const headers = rows[0];
          const dataRows = rows.slice(1);
  
          const student = dataRows.find((row) => row[headers.indexOf("Name")]?.trim() === cleanedName);
  
          if (student) {
            const absentDates = headers
              .slice(7)
              .map((date, idx) => ({
                date,
                status: student[7 + idx],
              }))
              .filter((entry) => entry.status === "Absent")
              .map((entry) => entry.date);
  
            attendanceData.push({
              subject,
              attendance: parseFloat(student[headers.indexOf("Attendance%")]) || 0,
              totalDays: headers.slice(7).length,
              daysPresent: headers.slice(7).length - absentDates.length,
              daysAbsent: absentDates.length,
              absentDates,
            });
          }
        }
  
        // Filter out subjects with no attendance data
        const filteredAttendanceData = attendanceData.filter(
          (data) => data.attendance > 0
        );
  
        setSubjectAttendance(filteredAttendanceData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
  
    const openModal = (details) => {
      setAttendanceDetails(details);
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };
  
    return (
      <div>
        <header className="header">
          <nav className="nav">
            <a href="https://rvu.edu.in" target="_blank" rel="noopener noreferrer">
              <img
                src="https://rvu.edu.in/wp-content/themes/rvu/images/rvu-logo.png"
                alt="RV University Logo"
                className="nav__logo"
              />
            </a>
            <ul className="nav__links">
              <li className="nav__item">
                <a className="nav__link" href="/clubchat">Club Chat</a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="/view_files">View uploads</a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="/upload">Upload Portfolio</a>
              </li>
              <li className="nav__item profile-container">
                <img
                  src={userDetails.picture}
                  alt="User Profile"
                  className="profile-picture"
                />
                <div className="profile-hover">
                  <p><strong>Name:</strong> {userDetails.name}</p>
                  <p><strong>Email:</strong> {userDetails.email}</p>
                  <p><strong>Course:</strong> {userDetails.course}</p>
                  <p><strong>Year of Joining:</strong> {userDetails.yearOfJoining}</p>
                  <p><strong>USN:</strong> {userDetails.usn}</p> {/* Display USN */}
                  <button
                    className="logout-button"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </nav>
          <div className="welcome-section">
            <h1 className="welcome-message animate-text">
              Welcome back, {userDetails.name.split(" ")[0]}!
            </h1>
            <p className="welcome-subtext animate-text">We're glad to have you here.</p>
            <hr className="underline-animate" />
          </div>
          <section className="attendance-section" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {subjectAttendance.map((data, index) => (
              <div
                key={index}
                style={{ width: "150px", height: "150px", textAlign: "center", cursor: "pointer" }}
                onClick={() =>
                  openModal({
                    subject: data.subject,
                    totalDays: data.totalDays,
                    daysPresent: data.daysPresent,
                    daysAbsent: data.daysAbsent,
                    absentDates: data.absentDates,
                  })
                }
              >
                <CircularProgressbar
                  value={data.attendance}
                  text={`${data.attendance}%`}
                  styles={buildStyles({
                    pathColor: `rgba(62, 152, 199, ${data.attendance / 100})`,
                    textColor: "#ffd700",
                    trailColor: "#d6d6d6",
                  })}
                />
                <h3 style={{ fontSize: "17px", marginBottom: "5px" }}>{data.subject}</h3>
              </div>
            ))}
          </section>
        </header>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Attendance Details"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              borderRadius: "10px",
              fontSize: "14px",
              padding: "20px",
              background: "#1a1a1a",
              color: "#fff",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Darken the overlay
            },
          }}
        >
          <h2>{attendanceDetails.subject} Attendance Details</h2>
          <p><strong>Total Days:</strong> {attendanceDetails.totalDays}</p>
          <p><strong>Days Present:</strong> {attendanceDetails.daysPresent}</p>
          <p><strong>Days Absent:</strong> {attendanceDetails.daysAbsent}</p>
          <h3>Absent Dates:</h3>
          <ul>
            {attendanceDetails.absentDates.map((date, idx) => (
              <li key={idx}>{date}</li>
            ))}
          </ul>
          <button
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              background: "empty",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "5px",
            }}
            onClick={closeModal}
          >
            Close
          </button>
        </Modal>
      </div>
    );
  };
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return element;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/clubchat" element={<ProtectedRoute element={<div>Club Chat Page</div>} />} />
        <Route path="/view_files" element={<ProtectedRoute element={<div>View Files Page</div>} />} />
        <Route path="/upload" element={<ProtectedRoute element={<div>Upload Portfolio Page</div>} />} />
      </Routes>
    </Router>
  );
};

export default App;
