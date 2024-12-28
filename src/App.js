import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";
import "./upstyle.css";

const clientId = "413792080053-i5gc4eg3lv5c8fotvpnof8g9coj068f1.apps.googleusercontent.com"; // Replace with your Google OAuth client ID
const apiKey = "AIzaSyDirHxXT360WyZYajUxGxgLe3S2TNwteJg"; // Replace with your GoogleAPIKey

// Configuration for multiple sheets
const subjectSheets = [
  { subject: "DBMS", sheetId: "1lGEetDCTBhP3xGLwaH_SNfsqTlG8XqodjsyDsg_ISxQ" },
  { subject: "OS", sheetId: "1Av0rHuf_csr6Nal8Ti8pTKOj8BE0z9YTjeqZGa4Aj9o" },
  { subject: "IEPD SP-1", sheetId: "1dDZeJDDg_AxDjiLwU1CMfZlsA32zxz_yI0r5Qz6uPx0" },
  { subject: "IEPD CIE-1", sheetId: "1dDZeJDDg_AxDjiLwU1CMfZlsA32zxz_yI0r5Qz6uPx0" },
  // Add more sheets here
];

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    const user = JSON.parse(atob(response.credential.split(".")[1]));
    const email = user.email;
    const name = user.name;
    const picture = user.picture || "https://via.placeholder.com/50";
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
      console.log("Extracted Name from Google OAuth (before cleaning):", name);
  
      // Remove variations of "BTECH 23" from the name
      const cleanedName = name
        .replace(/B\s?TECH\s?\d{2}$/i, "") // Removes 'BTECH 23', 'B TECH 23', etc.
        .trim() // Removes any extra spaces
        .toUpperCase(); // Ensures the name is in uppercase for comparison
  
      console.log("Final Cleaned Name (used for search):", cleanedName);
  
      const attendanceData = [];
  
      for (const { subject, sheetId } of subjectSheets) {
        console.log(`Fetching attendance for subject: ${subject}`);
  
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Attendance?key=${apiKey}`;
        const response = await axios.get(url);
  
        if (response.status !== 200) {
          console.error(`Failed to fetch data for ${subject}:`, response);
          continue;
        }
  
        const rows = response.data.values;
        const headers = rows[0];
        const dataRows = rows.slice(1);
  
        const nameIndex = headers.indexOf("Name");
        const percentageIndex = headers.indexOf("Attendance%");
  
        if (nameIndex === -1 || percentageIndex === -1) {
          console.error(`Name or Attendance% column not found in sheet: ${subject}`);
          continue;
        }
  
        const student = dataRows.find((row) => {
          console.log("Comparing with Row Name:", row[nameIndex]?.trim());
          return row[nameIndex]?.trim() === cleanedName;
        });
  
        if (student) {
          console.log(`Attendance found for ${subject}:`, student);
          attendanceData.push({ subject, attendance: parseFloat(student[percentageIndex]) || 0 });
        } else {
          console.error(`Student name not found in sheet: ${subject}`);
          attendanceData.push({ subject, attendance: 0 });
        }
      }
  
      setSubjectAttendance(attendanceData);
      console.log("Attendance Data for All Subjects:", attendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
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
          <h1 className="welcome-message">
            Welcome back, {userDetails.name.split(" ")[0]}!
          </h1>
          <p className="welcome-subtext">We're glad to have you here.</p>
          <hr style={{ border: "1px solid #ffd700", width: "80%", margin: "10px auto" }} />
        </div>
        <section className="attendance-section" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {subjectAttendance.map((data, index) => (
            <div key={index} style={{ width: "150px", height: "150px", textAlign: "center" }}>
              <h3 style={{ fontSize: "14px", marginBottom: "5px" }}>{data.subject}</h3>
              <CircularProgressbar
                value={data.attendance}
                text={`${data.attendance}%`}
                styles={buildStyles({
                  pathColor: `rgba(62, 152, 199, ${data.attendance / 100})`,
                  textColor: "#ffd700",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          ))}
        </section>
      </header>
      <main>
        <section className="features-section">
          <div className="section__title">
            <h2 className="section__description">Features</h2>
            <h3 className="section__header">Explore your advanced functionalities</h3>
          </div>
        </section>
      </main>
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
