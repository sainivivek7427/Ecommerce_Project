package com.ecom.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.config.JwtAuthenticationFilter;
import com.ecom.config.JwtUtil;
import com.ecom.config.UserDetailServiceimpl;
import com.ecom.dto.AuthRequest;
import com.ecom.entity.Customer;
import com.ecom.repository.CustomerRepository;
import com.ecom.service.LoginRegService;


@RestController
@RequestMapping("/api/auth")
public class LoginRegController {
    @Autowired private AuthenticationManager authManager;
    @Autowired private UserDetailServiceimpl userDetailsService;
    @Autowired private JwtUtil jwtUtil;

    @Autowired
    JwtAuthenticationFilter authenticationFilter;

    @Autowired
    LoginRegService loginRegService;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/reg")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer){
        Customer customerResponse=loginRegService.registerCustomer(customer);
        return ResponseEntity.ok(customerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            System.out.println("jkala");
            //authentaication manager call the userdetaiservice class to load the database and match the detail if correct or not
            Authentication auth =  authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
            System.out.println("Authentication "+auth.getDetails());
            UserDetails user = (UserDetails) auth.getPrincipal();
            String accessToken = jwtUtil.generateAccessToken(user);
            String refreshToken = jwtUtil.generateRefreshToken(user);
            return ResponseEntity.ok(Map.of(
                    "token", accessToken,
                    "refreshToken", refreshToken
            ));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials "+e.getMessage() );
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        try {
            String username = jwtUtil.extractUsername(refreshToken);
            UserDetails user = userDetailsService.loadUserByUsername(username);
            if (!jwtUtil.isTokenValid(refreshToken, user)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid refresh token");
            }
            String newAccessToken = jwtUtil.generateAccessToken(user);
            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid refresh token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authenticationFilter.blacklistToken(token);
        }
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/getallCustomer")
    public ResponseEntity<?> getAllCustomer(){
        try{
            return ResponseEntity.ok(customerRepository.findAll());
        }
        catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Exception "+ex.getMessage());
        }
    }
    //    //Add Gmail Verify
    // @PostMapping("/verify-otp")
    // public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
    //     Customer customer = loginRegService.getCustomerByEmail(email);
    //     if (customer == null) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
    //     }

    //     if (!otp.equals(customer.getOtp())) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP");
    //     }

    //     long currentTime = System.currentTimeMillis();
    //     if (currentTime - customer.getOtpGeneratedTime() > 5 * 60 * 1000) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP expired");
    //     }

    //     customer.setEnabled(true);
    //     customer.setOtp(null); // Clear OTP
    //     loginRegService.saveCustomer(customer);

    //     return ResponseEntity.ok("Email verified successfully");
    // }


    @GetMapping("/homepage")
    public ResponseEntity<?> getHome(){
        return ResponseEntity.ok("Home page redirect ..............  Hello world ");
    }
}
