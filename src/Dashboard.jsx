import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1>Dashboard</h1>
      <nav style={styles.nav}>
        <Link to="/teachers" style={styles.link}>Go to Teachers Page</Link>
      </nav>
    </div>
  );
};

const styles = {
  dashboard: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  nav: {
    marginTop: '20px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
};

export default Dashboard;
