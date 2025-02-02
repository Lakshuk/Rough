import axios from "axios";
const Base_URL = "http://localhost:8080/student";

export const getAllEmployee = async() => {
try{
    const response = await axios.get("http://localhost:8080/student/getAll1");
    return response.data;
}
catch(error){
    console.error("Error Fetching employee", error);
}
};

export const saveItem = async(studata) => {
    try{
        const response = await axios.post("http://localhost:8080/student/save", studata,
            {headers: {"content-Type" : "application/json",},});
        return response.data;
    }
    catch(error){
        console.error("Error saving Employee:", error);
        throw error;
    }
};

export const getEmployeeById = async(id) => {
    try{
        const response = await axios.get("http:localhost:8080/student/get/{id}");
        return response.data;
    }
    catch(error){
        console.error("Error fetching Employee", error);
    }
};

export const updateEmployee = async(id, EmployeeData) => {
    try{
        const response = await axios.put(`http:localhost:8080/student/update/${id}`);
        return response.data
    }
    catch(error){
        console.error("Error updating", error);
    }
}