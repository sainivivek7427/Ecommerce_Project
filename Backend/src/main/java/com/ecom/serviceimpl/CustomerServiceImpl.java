package com.ecom.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecom.dto.ForgotPasswordDto;
import com.ecom.repository.CustomerRepository;
import com.ecom.service.CustomerService;
import com.ecom.service.OTPService;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OTPService otpService;

    @Override
    public void resetPassword(ForgotPasswordDto dto) {
        // 1. Verify OTP
        // boolean isOtpValid = otpService.verifySmsOtp(dto.getMobile(), dto.getDeviceId(), dto.getOtp());

        // if (!isOtpValid) {
        //     throw new RuntimeException("❌ Invalid or expired OTP.");
        // }

        // // 2. Find customer by username
        // Customer customer = customerRepository.findByUsername(dto.getUsername())
        //         .orElseThrow(() -> new RuntimeException("❌ User not found"));

        // // 3. Encode new password
        // String encodedPassword = passwordEncoder.encode(dto.getNewPassword());

        // // 4. Save updated password
        // customer.setPassword(encodedPassword);
        // customerRepository.save(customer);
    }
}
