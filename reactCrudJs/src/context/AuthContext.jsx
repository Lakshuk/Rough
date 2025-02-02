import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Register function
  const register = async (username, password, email) => {
    try {
      const response = await axios.post("http://localhost:8080/student/user/register", {
        username,
        password,
        email,
      });
      return { success: true, message: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data || "An error occurred!" };
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/student/user/login",
         { username, password });

         if(response.data === "Login Successful!"){
          setCurrentUser(username);   //store user session
          return { success: true, message: "Login successful!" };
         }
         else{
          return { success: false, message: "Invalid credentials!" };
         }}
        catch(error){
          return { success: false, message: "Invalid credentials!" };
        }};

        
       // Store username in state
      //localStorage.setItem('currentUser', username); // Persist username in localStorage
    //   return { success: true, message: "Login successful!" };
    // } catch (error) {
    //   return { success: false, message: "Invalid credentials!" };
    //   console.log(response);
    

  

  // Logout function
  const logout = () => {
    setCurrentUser(null); // Remove from state
    // localStorage.removeItem('currentUser'); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};