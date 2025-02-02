import React,{useState , useEffect} from "react";
//import {getAllEmployee, updateEmployee} from "../apiService"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeUpdate = () =>{
    const {id} = useParams();   //get employee id from url

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name : "",
        number : "",
        email : ""
        // password : "",
        // country: ""
    });

    //fetch the student data
    useEffect(() => {
    //     fetchEmployee();
    // }, []);

    const fetchEmployee = async () => {
        try{
            const response = await axios.get(`http://localhost:8080/student/get/${id}`);
            //const data = await getAllEmployee(id);
            setFormData(response.data);
        }
        catch(error){
            alert("Failed to fetch the data");
            console.error(error);
        }
    };
    fetchEmployee(); },[]);
    

    //handle input changes
    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData({...formData, [name] : value,});
    };

    //submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8080/student/update/${id}`, formData);
            //await updateEmployee(id, formData);
            alert("student updated Successfully");
            navigate("/");  //navigate back to list after update
        }
        catch(error) {
            alert("Failed to update");
            console.error("Error updating Employee", error);
        }  
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>Update</h1>
            <input type = "text" placeholder="name" value={formData.name} onChange={handleChange}></input>

            <input type = "text" placeholder="number" value={formData.number} onChange={handleChange}></input>

            <input type = "text" placeholder="email" value={formData.email} onChange={handleChange}></input>

            <input type = "text" placeholder="password" value={formData.password} onChange={handleChange}></input>

            <input type = "text" placeholder="country" value={formData.country} onChange={handleChange}></input>

            <button type = "submit">Update</button>
        </form>

    )
};

export default EmployeeUpdate;
