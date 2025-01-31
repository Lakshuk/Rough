import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { getAllEmployee } from "../apiService";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

//Fetching the data
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);  //state to store the student list
    //const [statusMessage, setStatusMessage] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
    fetch("http://localhost:8080/Employee/getAll")
    .then((response) => response.json())
    .then((data) => setEmployees (data))
    .catch((error) => console.error("Error fetching Employee", error)); }, []); 

    
    const handleCardClick = (id) => {
      navigate(`/employee/${id}`);  //navigate to get employee page
    };


    const handleLogout =  () =>{
      localStorage.removeItem('user');
      navigate('/')
    }


  const handleAddEmployee = () => {
    navigate("/add-employee");
  };


  return (
    <div className="employee-list-container">
      <div className="add-button">
      <button className="add-employee-btn" onClick={handleAddEmployee}>
        Add
      </button>

      <button className="logout-button" onClick={handleLogout}>
          Logout
      </button>
      </div>
      
      <div className="employee-card-container">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="employee-card"
            onClick={() => handleCardClick(employee.id)}
          >
            <h3>{employee.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  // return (
  //   <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
  //     {employees.map((employee) => (
  //       <div
  //         key={employee.id}
  //         style={{
  //           border: "1px solid #ccc",
  //           borderRadius: "8px",
  //           padding: "16px",
  //           width: "200px",
  //           textAlign: "center",
  //           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  //           cursor: "pointer",
  //         }}
  //         onClick={() => handleCardClick(employee.id)}
  //       >
  //         <h3>{employee.name}</h3>

  //         <button className="add-employee-btn" onClick={handleAddEmployee}Add></button>
          
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default EmployeeList;

