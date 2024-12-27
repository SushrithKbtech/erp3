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
        color: '#FFFFFF', // White text colors
      }}
    >
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '3rem', margin: '0px' }}>
          Welcome to RV University
        </h1>
        <p style={{ fontSize: '1.5rem', margin: '10px 0px', fontWeight: 'lighter' }}>
          Please log in with your Google account to continue.
        </p>
      </header>
    </div>
  );
};

export default App;
