package com.ecom.controller;
import com.ecom.dto.ForgotPasswordDto;
import com.ecom.dto.OtpResponseDto;
import com.ecom.dto.VerifyRequestDto;
import com.ecom.service.OTPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.OtpRequestDto;

@RestController
@RequestMapping("/api/otp")
public class TestOTPController {



    @Autowired
    private OTPService otpService;


    // Endpoint to send OTP email
    @PostMapping("/generate-by-email")
    public ResponseEntity<?> sendOtpbyEmail(@RequestBody OtpRequestDto otpRequestDto) {
        OtpResponseDto otpResponseDto = null;
        try {

            String result = otpService.generateEmailOtp(otpRequestDto.getTypeValue(), otpRequestDto.getDeviceId());

            System.out.println("OTP sent successfully to " + result);
            otpResponseDto = new OtpResponseDto("Otp sent succesfully to email and code is  " + result, HttpStatus.ACCEPTED);
            return ResponseEntity.ok(otpResponseDto);

        } catch (Exception ex) {
            otpResponseDto = new OtpResponseDto(ex.getMessage(), HttpStatus.BAD_REQUEST);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(otpResponseDto);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyOtpEmail(@RequestBody VerifyRequestDto verifyRequestDto) {
        boolean isValid = otpService.verifyEmailOtp(verifyRequestDto.getTypevalue(), verifyRequestDto.getDeviceId(), verifyRequestDto.getOtp());
        if (isValid) {
            return ResponseEntity.ok("OTP verified successfully for email.");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired OTP for email.");
        }
    }

    @PostMapping("/generate-by-phone")
    public ResponseEntity<?> sendOtpbyPhone(@RequestBody OtpRequestDto otpRequestDto) {
//        String otp = generateOtp();
//        otpRequest.setOtp(otp); // Set the generated OTP in the request DTO
        OtpResponseDto otpResponsePhoneDto=null;
        try{

            String result=otpService.generateEmailOtp(otpRequestDto.getTypeValue(),otpRequestDto.getDeviceId());

            System.out.println("OTP sent successfully to " + result);

            otpResponsePhoneDto=new OtpResponseDto("Otp sent succesfully to phone and otp is  "+result, HttpStatus.ACCEPTED);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(otpResponsePhoneDto);

        }

        catch (Exception ex){
            otpResponsePhoneDto=new OtpResponseDto("Error to send email ",HttpStatus.BAD_REQUEST);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(otpResponsePhoneDto);
//        return ResponseEntity.ok(emailService.sendOtp(otpRequest.getUserId(),otpRequest.getType(),otpRequest.getTypevalue(),otp));
    }

    @PostMapping("/verify-sms")
    public ResponseEntity<?> verifyOtpSms(@RequestBody VerifyRequestDto verifyRequestDto) {
        boolean isValid = otpService.verifySmsOtp(verifyRequestDto.getTypevalue(), verifyRequestDto.getDeviceId(), verifyRequestDto.getOtp());
        if (isValid) {
            return ResponseEntity.ok("OTP verified successfully for email.");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired OTP for email.");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDto dto) {
        try {
            String result = otpService.forgotPassword(dto);
            return ResponseEntity.ok(result);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }




}