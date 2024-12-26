import React from 'react';

const Dashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1>Dashboard</h1>
    </div>
  );
};

const styles = {
  dashboard: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
  },
};

export default Dashboard;
