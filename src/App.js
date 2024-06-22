import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ValidateTimesheetsPage from "./components/ValidateTimesheetsPage";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <div className="background-image">
          <h1>ShiftSync</h1>
          <h2>An Employee Time-Entry Management System</h2>
          <Routes>
            <Route
              path="/"
              element={
                !user ? <Login setUser={setUser} /> : <Dashboard user={user} />
              }
            />
            <Route
              path="/validate-timesheets"
              element={<ValidateTimesheetsPage />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
};

export default App;
