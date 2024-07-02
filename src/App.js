import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ValidateTimesheetsPage from "./components/ValidateTimesheetsPage";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/validate-timesheets"
            element={<ValidateTimesheetsPage />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
