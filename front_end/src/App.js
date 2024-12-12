import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import ViewEmployee from "./components/ViewEmployee";
import Navbar from "./components/Navbar";

const App = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [submissionMsg, setSubmissionMsg] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-employees");
        setEmployeeData(response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/add-employee", data);
      setSubmissionMsg(response.data.message);

      const updatedResponse = await axios.get("http://localhost:5000/get-employees");
      setEmployeeData(updatedResponse.data.employees);
    } catch (error) {
      setSubmissionMsg(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={<EmployeeForm onFormSubmit={handleFormSubmit} submissionMsg={submissionMsg} />}
            />
            <Route
              path="/view-employee"
              element={<ViewEmployee employeeData={employeeData} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
