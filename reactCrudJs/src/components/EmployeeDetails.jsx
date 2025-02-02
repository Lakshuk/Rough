import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import './EmployeeDetails.css';

const EmployeeDetails = () => {

  const { user, logout } = useAuth();

  const { id } = useParams(); // Extract employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null); // Employee details state
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    department : "",
    salary : "",
    //password: "",
    //country: "",
  });

  // Fetch employee details by ID
  useEffect(() => {
    fetch(`http://localhost:8080/student/get/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
        setFormData(data); // Pre-fill form data for editing
      })
      .catch((error) => console.error("Error fetching employee details:", error));
  }, [id]);

  // Handle delete operation
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      fetch(`http://localhost:8080/student/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            alert("Employee deleted successfully!");
            navigate("/employee-list"); // Redirect to the list page
          } else {
            alert("Failed to delete the employee.");
          }
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update operation
  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/student/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Employee updated successfully!");
          setEmployee(formData); // Update the displayed details
          setIsEditing(false); // Exit edit mode
        } else {
          alert("Failed to update employee.");
        }
      })
      .catch((error) => console.error("Error updating employee:", error));
  };

  // Loading state or employee not found
  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="employee-details-container">
      {!isEditing ? (
        <>
        <div className="employee-card">
          <h1 className="employee-name">{employee.name}</h1>
          <p className="employee-info"><strong>Email:</strong> {employee.email}</p>
          <p className="employee-info"><strong>Number:</strong> {employee.number}</p>
          {/* <p className="employee-info"><strong>Password:</strong> {employee.password}</p>
          <p className="employee-info"><strong>Country:</strong> {employee.country}</p> */}
          <p className="employee-info"><strong>Department:</strong> {employee.department}</p>
          <p className="employee-info"><strong>Salary:</strong> {employee.salary}</p>
          </div>

          <div className="action-buttons">
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="home-btn" onClick={() => navigate("/employee-list")}>
              Back
              </button>
          </div>
        </>
      ) : (
        <div className="edit-div">
        <form onSubmit={handleUpdate} className="employee-edit-form">
        {/* <form onSubmit={handleUpdate} className="employee-edit-form"> */}
          <h2 className="form-title">EDIT</h2>
          <label className="form-label">
            Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          
        
          <label className="form-label">
            Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          
          
          <label className="form-label">
            Number:
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              required
            />
          

          {/* <label className="form-label">
            Password:
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <br /> */}

          {/* <label className="form-label">
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </label>
          <br /> */}

          <label className="form-label">
            Department:
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />

          <label className="form-label">
            Salary:
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
            />
         
          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Save</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel</button>
          </div>

      
        </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;