import React, { useState } from 'react';
import axios from 'axios';
import './EmployeeForm.css';

const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

const EmployeeForm = () => {
  const [form, setForm] = useState({
    emp_name: "",
    emp_id: "",
    email: "",
    phn_no: "",
    department: "",
    joining_date: "",
    emp_role: "",
  });

  const [errors, setErrors] = useState({});
  const [submissionMsg, setSubmissionMsg] = useState("");

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    const namePattern = /^[A-Za-z\s]+$/;
    if (!form.emp_name.trim()) {
      newErrors.emp_name = "Name is required";
    } else if (!namePattern.test(form.emp_name)) {
      newErrors.emp_name = "Name should contain only alphabets and spaces";
    }

    const idPattern = /^[0-9]+$/;
    if (!form.emp_id.trim()) {
      newErrors.emp_id = "Employee ID is required";
    } else if (!idPattern.test(form.emp_id)) {
      newErrors.emp_id = "Employee ID should contain only numbers";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    const phonePattern = /^\d{10}$/;
    if (!form.phn_no.trim()) {
      newErrors.phn_no = "Phone number is required";
    } else if (!phonePattern.test(form.phn_no)) {
      newErrors.phn_no = "Invalid phone number";
    }

    if (!form.department.trim()) newErrors.department = "Department is required";

    if (!form.joining_date.trim()) newErrors.joining_date = "Joining date is required";

    if (!form.emp_role.trim()) newErrors.emp_role = "Role is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) isValid = false;
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Ensure the backend API URL is correct
        const response = await axios.post('http://localhost:5000/addEmployee', form);
        setSubmissionMsg(response.data.message); // Display success message
        setForm({
          emp_name: "",
          emp_id: "",
          email: "",
          phn_no: "",
          department: "",
          joining_date: "",
          emp_role: "",
        });
        setErrors({});
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionMsg(error.response?.data?.message || "Error submitting form");
      }
    } else {
      setSubmissionMsg("");
    }
  };

  const handleReset = () => {
    setForm({
      emp_name: "",
      emp_id: "",
      email: "",
      phn_no: "",
      department: "",
      joining_date: "",
      emp_role: "",
    });
    setErrors({});
    setSubmissionMsg("");
  };

  return (
    <div className="employee-form-container">
      <h2 className="employee-form-title">Add Employee</h2>
      {submissionMsg && (
        <p
          className={`employee-form-message ${
            submissionMsg.includes("success") ? "employee-form-message-success" : "employee-form-message-error"
          }`}
        >
          {submissionMsg}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="emp_name"
            value={form.emp_name}
            onChange={handleChange}
            className="employee-form-input"
          />
          {errors.emp_name && <p className="employee-form-error">{errors.emp_name}</p>}
        </div>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            name="emp_id"
            value={form.emp_id}
            onChange={handleChange}
            className="employee-form-input"
          />
          {errors.emp_id && <p className="employee-form-error">{errors.emp_id}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="employee-form-input"
          />
          {errors.email && <p className="employee-form-error">{errors.email}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phn_no"
            value={form.phn_no}
            onChange={handleChange}
            className="employee-form-input"
          />
          {errors.phn_no && <p className="employee-form-error">{errors.phn_no}</p>}
        </div>
        <div>
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="employee-form-select"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <p className="employee-form-error">{errors.department}</p>}
        </div>
        <div>
          <label>Joining Date</label>
          <input
            type="date"
            name="joining_date"
            value={form.joining_date}
            onChange={handleChange}
            className="employee-form-date"
          />
          {errors.joining_date && <p className="employee-form-error">{errors.joining_date}</p>}
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="emp_role"
            value={form.emp_role}
            onChange={handleChange}
            className="employee-form-input"
          />
          {errors.emp_role && <p className="employee-form-error">{errors.emp_role}</p>}
        </div>
        <div className="employee-form-buttons">
          <button type="submit" className="employee-form-button employee-form-button-submit">
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="employee-form-button employee-form-button-reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
