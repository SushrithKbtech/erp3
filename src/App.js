import React from "react";

function App() {
  return (
    <div style={styles.dashboardContainer}>
      {/* Left Section */}
      <div style={styles.dashboardLeft}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.profilePictureContainer}>
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                style={styles.profilePicture}
              />
            </div>
            <div>
              <h3 style={styles.profileName}>Hey, Alex</h3>
              <p style={styles.profileId}>ID: 12100330</p>
            </div>
          </div>
          <div style={styles.profileDetails}>
            <p>
              <strong>Course:</strong> BTech, Computer Science & Engineering
            </p>
            <p>
              <strong>DOB:</strong> 29-Feb-2020
            </p>
            <p>
              <strong>Contact:</strong> 1234567890
            </p>
            <p>
              <strong>Email:</strong> unknown@gmail.com
            </p>
            <p>
              <strong>Address:</strong> Ghost town Road, New York, America
            </p>
          </div>
        </div>
      </div>

      {/* Center Section */}
      <div style={styles.dashboardCenter}>
        <h2 style={styles.sectionHeader}>
          Attendance
          <div style={styles.yellowLine}></div>
        </h2>
        <div style={styles.attendanceCards}>
          {[
            { subject: "Engineering Graphics", percentage: 86, count: "12/14" },
            { subject: "Mathematical Engineering", percentage: 93, count: "27/29" },
            { subject: "Computer Architecture", percentage: 81, count: "27/30" },
            { subject: "Database Management", percentage: 96, count: "24/25" },
            { subject: "Network Security", percentage: 92, count: "25/27" },
          ].map((item, index) => (
            <div key={index} style={styles.attendanceCard}>
              <div style={styles.circleGraph}>
                <svg style={styles.progressRing} width="80" height="80">
                  {/* Background Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#555"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#FFFF00"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray="226.2"
                    strokeDashoffset={`${
                      226.2 - (226.2 * item.percentage) / 100
                    }`}
                  />
                </svg>
                {/* Percentage Inside the Circle */}
                <div style={styles.circlePercentage}>
                  <span>{item.percentage}%</span>
                </div>
              </div>
              <h3 style={styles.whiteText}>{item.subject}</h3>
              <p style={styles.whiteText}>{item.count}</p>
            </div>
          ))}
        </div>
        <h2 style={styles.sectionHeader}>
          Today's Timetable
          <div style={styles.yellowLine}></div>
        </h2>
        <table style={styles.timetable}>
          <thead>
            <tr style={styles.timetableRow}>
              <th style={styles.whiteText}>Time</th>
              <th style={styles.whiteText}>Room No.</th>
              <th style={styles.whiteText}>Subject</th>
              <th style={styles.whiteText}>Type</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: "10-11 AM", room: "33-309", subject: "DBMS130", type: "Lecture" },
              { time: "11-12 AM", room: "38-719", subject: "CS200", type: "Lecture" },
              { time: "01-02 PM", room: "33-309", subject: "MTH866", type: "Lecture" },
            ].map((row, index) => (
              <tr key={index} style={styles.timetableRow}>
                <td style={styles.whiteText}>{row.time}</td>
                <td style={styles.whiteText}>{row.room}</td>
                <td style={styles.whiteText}>{row.subject}</td>
                <td style={styles.whiteText}>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Section */}
      <div style={styles.dashboardRight}>
        <div style={styles.rightCard}>
          <h2 style={styles.sectionHeader}>
            Announcements
            <div style={styles.yellowLine}></div>
          </h2>
          <p style={styles.whiteText}>
            <strong>Academic:</strong> Summer training internship with Live Projects.
          </p>
          <p style={styles.whiteText}>
            <strong>Co-curricular:</strong> Global internship opportunity by Student Organization.
          </p>
          <p style={styles.whiteText}>
            <strong>Examination:</strong> Instructions for Mid Term Examination.
          </p>
        </div>
        <div style={styles.rightCard}>
          <h2 style={styles.sectionHeader}>
            Teachers on Leave
            <div style={styles.yellowLine}></div>
          </h2>
          <ul>
            <li style={styles.whiteText}>The Professor - Full Day</li>
            <li style={styles.whiteText}>Lisa Manobal - Half Day</li>
            <li style={styles.whiteText}>Himanshu Jindal - Full Day</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: "flex",
    height: "100vh",
    padding: "20px",
    gap: "20px",
    background: "#000000",
    color: "#FFFFFF",
  },
  dashboardLeft: {
    flex: 1,
    padding: "20px",
    borderRadius: "20px",
    background: "#333333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  profileCard: {
    textAlign: "left",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  profilePictureContainer: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileName: {
    margin: 0,
    color: "#FFFF00",
  },
  dashboardCenter: {
    flex: 2,
    padding: "20px",
    borderRadius: "20px",
    background: "#333333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    color: "#FFFFFF",
    position: "relative",
    marginBottom: "10px",
  },
  yellowLine: {
    content: '""',
    display: "block",
    width: "60px",
    height: "4px",
    backgroundColor: "#FFFF00",
    borderRadius: "2px",
    marginTop: "5px",
    marginLeft: "0",
  },
  attendanceCards: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  attendanceCard: {
    flex: 1,
    margin: "0 10px",
    textAlign: "center",
    background: "#555555",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  circleGraph: {
    position: "relative",
    width: "80px",
    height: "80px",
    margin: "0 auto",
  },
  progressRing: {
    transform: "rotate(-90deg)",
  },
  timetable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    overflow: "hidden",
  },
  circlePercentage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#FFFF00",
  },
  dashboardRight: {
    flex: 1,
    padding: "20px",
    borderRadius: "20px",
    background: "#333333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  rightCard: {
    padding: "15px",
    background: "#555555",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  whiteText: {
    color: "#FFFFFF",
  },
};

export default App;
