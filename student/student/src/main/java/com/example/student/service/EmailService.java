package com.example.student.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	public void sendWelcomeEmail(String toEmail, String username) throws MessagingException {
        String subject = "Welcome to Our Platform!";
        String body = String.format("Hello %s,\n\nWelcome to our platform! We are excited to have you on board.\n\nBest Regards,\nThe Team", username);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(body);

        mailSender.send(message);
    }
}
