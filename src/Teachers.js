import React from 'react';

const Teachers = () => {
  return (
    <div style={styles.teachers}>
      <h1>Teachers Page</h1>
    </div>
  );
};

const styles = {
  teachers: {
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

export default Teachers;
