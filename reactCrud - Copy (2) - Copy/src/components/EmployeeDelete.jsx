const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/student/delete/${id}`);
        alert("Employee deleted successfully!")
       navigate("/employees-list")
        //setEmployee(employee.filter((emp) => emp.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  export default handleDelete;