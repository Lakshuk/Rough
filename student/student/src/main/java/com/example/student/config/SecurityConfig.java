package com.example.student.config;

import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

	// Configure in-memory user details
    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
        

        manager.createUser(User.withUsername("user")
                .password(passwordEncoder().encode("password"))  // Encode the password
                .roles("USER")  // Assign the role
                .build());

        return manager;
    }

    // Password encoder for bcrypt hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .anyRequest().permitAll()  // Allow all requests without authentication
            .and()
            .formLogin()  // Enable default login page
            .permitAll()
            .and()
            .httpBasic();  // Enable basic authentication for APIs

        // Disable CSRF for H2 console
        http.csrf().disable();
        
        // Allow frames for H2 console
        http.headers().frameOptions().disable();

        return http.build();  // Spring Security 5.x
    }
}
