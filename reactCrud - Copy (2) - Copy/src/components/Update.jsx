import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Employee.css';

const EditUser = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  //const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:8080/student/get/${id}`);
      setName(response.data.name);
      setNumber(response.data.number);
      setEmail(response.data.email);
      // setPassword(response.data.password);
      // setCountry(response.data.country);
      setDepartment(response.data.department);
      setSalary(response.data.salary);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/student/update/${id}`, { name, number, email, department, salary});
    navigate("/");
  };
  return (
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Number:</label>
        <input
          type="number"
          value={number}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> */}

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Department:</label>
        <input
          type="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div>
        <label>Salary:</label>
        <input
          type="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      {/* <div>
        <label>Country:</label>
        <input
          type="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div> */}
      <button type="submit">Update User</button>
    </form>
  );
};
export default EditUser;
