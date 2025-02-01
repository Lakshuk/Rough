import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
//import { saveItem} from "../apiService.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Employee.css';
import { AuthContext } from '../context/AuthContext';

const Employee = ({employeeToUpdate, onSubmit}) => {

  const navigate = useNavigate();

  //const [user, setUser] = useState([]);   //storing the value in array

  const [UserDetail, setUserDetail] = useState({    //getting the field vaue in object
    name : "",
    number : "",
    email : "",
    // password : "",
    // country : "",
    department : "",
    salary : ""
  });


  // useEffect(() =>{
  //   if(employeeToUpdate){
  //     setUserDetail({name:employeeToUpdate.name || '',
  //                   number:employeeToUpdate.number || '',
  //                   email:employeeToUpdate.email || '',
  //                   department:employeeToUpdate.department || '',
  //                   salary:employeeToUpdate.salary || '',
  //     });
  //   }
  // }, [employeeToUpdate]);
  

  const handleChange = (e) => {     //handle changes in form input fields
    //console.log(e);
    const {name, value} = e.target;
    setUserDetail({...UserDetail, [name]: value});
  };


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:8080/student/save", UserDetail);   //call the saveItem function from the apiservice.jsx file
       alert("User added successfully");
      setUserDetail({ //reset the form
        name : "",
        number : "",
        email : "",
        //password : "",
        //country : "",
        department : "",
        salary : ""
      });
    }
    catch(error){
      alert("Error adding user");
      console.log(error);
    }
  };
  
    
  return(
    <div className = "form-container">
      <div className = "form-card">
    <form onSubmit={handleSubmit} className = "form">
      <div className = "form-group">
      <label htmlFor='name'>Name:</label>
      <input type ="text" name="name" value={UserDetail.name} onChange={handleChange}></input> <br />
      </div>

      <div className = "form-group">
      <label htmlFor='number'>Number:</label>
      <input type ="text" name="number" value={UserDetail.number} onChange={handleChange}></input> <br />
      </div>

      <div className = "form-group">
      <label htmlFor='email'>Email:</label>
      <input type ="text" name="email" value={UserDetail.email} onChange={handleChange}></input> <br />
      </div>

      {/* <div className = "form-group">
      <label htmlFor='password'>Password:</label>
      <input type ="text" name="password" value={UserDetail.password} onChange={handleChange}></input> <br />
      </div> */}

      {/* <div className = "form-group">
      <label htmlFor='country'>Country:</label>
      <input type ="text" name="country" value={UserDetail.country} onChange={handleChange}></input> <br />
      </div> */}

      <div className = "form-group">
      <label htmlFor='department'>Department:</label>
      <input type ="text" name="department" value={UserDetail.department} onChange={handleChange}></input> <br />
      </div>

      <div className = "form-group">
      <label htmlFor='salary'>Salary:</label>
      <input type ="text" name="salary" value={UserDetail.salary} onChange={handleChange}></input> <br />
      </div>

    <div className="edit-buttons">
      <button type = "submit" className = "submit-btn">Add</button>

      <button onClick={() => navigate('/employee-list')} className = "submit">View</button>
      </div>
    </form>
    </div>
    </div>
  );
}


export default Employee;