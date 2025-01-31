package com.example.student.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.student.dto.StudentDto;
import com.example.student.model.Student;
import com.example.student.model.StudentDetails;
import com.example.student.service.StudentService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins ="http://localhost:5173/")
public class StudentController {
	
	@Autowired
	public StudentService studentService;
	
	
	@PostMapping("/save")
	public StudentDto create(@RequestBody StudentDto stu) {
		return studentService.create(stu);
	}
	
	@GetMapping("/get/{id}")
	public StudentDto getById(@PathVariable Integer id) {
		return studentService.getEmpById(id);
	}
	
	@GetMapping("/getAll")
	public List<StudentDto> getAll(){
		return studentService.getAll();
	}
	
	@GetMapping("/getAll1")
	public List<Student> getAll1(){
		return studentService.getAll1();
	}
	
	@PutMapping("/update/{id}")
	public Student updateStudent(@RequestBody StudentDto studentDto, @PathVariable Integer id) {
		return studentService.updateStudent(studentDto, id);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteEmp(@PathVariable Integer id) {
		studentService.deleteStu(id);
	}
	
	// Register user
//    @PostMapping("/user/register")
//    public ResponseEntity<?> register(@RequestBody StudentDetails user) throws MessagingException {
//         studentService.registerUser(user);
//    	return ResponseEntity.ok("User Register Successfully");	
//    }
//
//    // Login user
//    @PostMapping("/user/login")
//    public String login(@RequestParam String username, @RequestParam String password) {
//        return studentService.loginUser(username, password);
//    }
	
	@PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody StudentDetails user) throws MessagingException {
        return studentService.registerUser(user);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        return studentService.loginUser(username, password);
    }
}
