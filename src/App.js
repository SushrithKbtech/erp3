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
                    stroke="#e0e0e0"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#d4af37"
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
              <h3>{item.subject}</h3>
              <p>{item.count}</p>
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
              <th>Time</th>
              <th>Room No.</th>
              <th>Subject</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: "10-11 AM", room: "33-309", subject: "DBMS130", type: "Lecture" },
              { time: "11-12 AM", room: "38-719", subject: "CS200", type: "Lecture" },
              { time: "01-02 PM", room: "33-309", subject: "MTH866", type: "Lecture" },
            ].map((row, index) => (
              <tr key={index} style={styles.timetableRow}>
                <td>{row.time}</td>
                <td>{row.room}</td>
                <td>{row.subject}</td>
                <td>{row.type}</td>
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
          <p>
            <strong>Academic:</strong> Summer training internship with Live Projects.
          </p>
          <p>
            <strong>Co-curricular:</strong> Global internship opportunity by Student Organization.
          </p>
          <p>
            <strong>Examination:</strong> Instructions for Mid Term Examination.
          </p>
        </div>
        <div style={styles.rightCard}>
          <h2 style={styles.sectionHeader}>
            Teachers on Leave
            <div style={styles.yellowLine}></div>
          </h2>
          <ul>
            <li>The Professor - Full Day</li>
            <li>Lisa Manobal - Half Day</li>
            <li>Himanshu Jindal - Full Day</li>
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
    background: "linear-gradient(135deg, #ffffff, #d4af37)",
    color: "#333",
  },
  dashboardLeft: {
    flex: 1,
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.95)",
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
    color: "#d4af37",
  },
  dashboardCenter: {
    flex: 2,
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    color: "#d4af37",
    position: "relative",
    marginBottom: "10px",
  },
  yellowLine: {
    content: '""',
    display: "block",
    width: "60px",
    height: "4px",
    backgroundColor: "#d4af37",
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
    background: "#fff",
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
    color: "#333",
  },
  dashboardRight: {
    flex: 1,
    padding: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  rightCard: {
    padding: "15px",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
};

export default App;
