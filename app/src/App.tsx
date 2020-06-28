import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [token, setToken] = useState(undefined);

  return (
    <div className="App container col-lg-6 col-offset-3">
      {
        !token &&
        <Login setToken={setToken} />
      }

      {
        token &&
        <Dashboard token={token} />
      }
    </div>
  );
}

export default App;
