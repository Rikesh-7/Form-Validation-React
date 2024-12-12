import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewEmployee.css";

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.emp_name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-employees");
      console.log("Response from server:", response.data);
      setEmployees(response.data.employees); // Save employees to state
      setFilteredEmployees(response.data.employees); // Set the filtered employees to the state
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="view-employee">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="employee-table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.emp_id}>
                <td>{employee.emp_name}</td>
                <td>{employee.emp_id}</td>
                <td>{employee.email}</td>
                <td>{employee.phn_no}</td>
                <td>{employee.department}</td>
                <td>{employee.joining_date}</td>
                <td>{employee.emp_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEmployee;
