import React from 'react';

const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#000000', // Fully dark black background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF', // White text color
        fontFamily: '"Poppins", sans-serif', // Stylish and professional font
      }}
    >
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0px', color: '#B8860B' }}>
          Welcome to RV University Portal
        </h1>
        <p style={{ fontSize: '1.5rem', margin: '10px 0px', fontWeight: 100 }}>
          Please log in with your Google account to continue.
        </p>
      </header>
    </div>
  );
};

export default App;
