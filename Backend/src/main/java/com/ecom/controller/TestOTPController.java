package com.ecom.controller;
import com.ecom.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecom.dto.ForgotRequestOtpDto;
import com.ecom.dto.MessageResponseDto;
import com.ecom.dto.OtpRequestDto;
import com.ecom.dto.OtpResponseDto;
import com.ecom.dto.VerifyRequestDto;
import com.ecom.service.OTPService;

@RestController
@RequestMapping("/api/otp")
public class TestOTPController {



    @Autowired
    private OTPService otpService;


    // Endpoint to send OTP email
    @PostMapping("/generate")
    public ResponseEntity<?> sendOtpbyEmail(@RequestBody OtpRequestDto otpRequestDto) {
        OtpResponseDto otpResponseDto = null;
        try {

            String result = otpService.generateOtpbyEmailOrPhone(otpRequestDto);

            System.out.println("Res:  " + result);
            otpResponseDto = new OtpResponseDto( result, HttpStatus.ACCEPTED);
            return ResponseEntity.ok(otpResponseDto);

        } catch (Exception ex) {
            otpResponseDto = new OtpResponseDto(ex.getMessage(), HttpStatus.BAD_REQUEST);

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(otpResponseDto);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyOtpEmail(@RequestBody VerifyRequestDto verifyRequestDto) {
        // boolean isValid = otpService.verifyEmailOtp(verifyRequestDto.getTypevalue(), verifyRequestDto.getDeviceId(), verifyRequestDto.getOtp());
        // if (isValid) {
        //     return ResponseEntity.ok("OTP verified successfully for email.");
        // } else {
        //     return ResponseEntity.status(400).body("Invalid or expired OTP for email.");
        // }
        try{
            boolean isValid = otpService.verifyEmailOtp(verifyRequestDto.getTypevalue(), verifyRequestDto.getDeviceId(), verifyRequestDto.getOtp());
        if (isValid) {
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(true);
            messageResponseDto.setStatus(HttpStatus.OK);
            System.out.println("OTP verified successfully to Email.");
            return ResponseEntity.ok(messageResponseDto);
        } else {
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(false);
            messageResponseDto.setStatus(HttpStatus.BAD_REQUEST);
            System.out.println("Invalid or expired OTP for phone.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageResponseDto);
        }
        }
        catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

//    @PostMapping("/generate-by-phone")
//    public ResponseEntity<?> sendOtpbyPhone(@RequestBody OtpRequestDto otpRequestDto) {
////        String otp = generateOtp();
////        otpRequest.setOtp(otp); // Set the generated OTP in the request DTO
//        OtpResponseDto otpResponsePhoneDto=null;
//        try{
//            String phoneno="91"+otpRequestDto.getTypeValue();
//            String result=otpService.generateSmsOtp(phoneno,otpRequestDto.getDeviceId());
//
//            System.out.println("OTP sent successfully to " + result);
//
//            otpResponsePhoneDto=new OtpResponseDto("Otp sent succesfully to phone and otp is  "+result, HttpStatus.ACCEPTED);
//            return ResponseEntity.status(HttpStatus.ACCEPTED).body(otpResponsePhoneDto);
//
//        }
//
//        catch (Exception ex){
//            otpResponsePhoneDto=new OtpResponseDto("Error to send email ",HttpStatus.BAD_REQUEST);
//
//        }
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(otpResponsePhoneDto);
////        return ResponseEntity.ok(emailService.sendOtp(otpRequest.getUserId(),otpRequest.getType(),otpRequest.getTypevalue(),otp));
//    }

    @PostMapping("/verify-sms")
    public ResponseEntity<?> verifyOtpSms(@RequestBody VerifyRequestDto verifyRequestDto) {
        try{
            String phoneno="91"+verifyRequestDto.getTypevalue();
            boolean isValid = otpService.verifySmsOtp(phoneno, verifyRequestDto.getDeviceId(), verifyRequestDto.getOtp());
        if (isValid) {
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(true);
            messageResponseDto.setStatus(HttpStatus.OK);
            System.out.println("OTP verified successfully to phone.");
            return ResponseEntity.ok(messageResponseDto);
        } else {
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(false);
            messageResponseDto.setStatus(HttpStatus.BAD_REQUEST);
            System.out.println("Invalid or expired OTP for phone.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(messageResponseDto);
        }
        }
        catch (Exception ex){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
        
    }

    @PostMapping("/forgot-password-otp-genarate")
    public ResponseEntity<?> forgotPasswordOtPGenerate(@RequestBody ForgotRequestOtpDto forgotRequestOtpDto) {
        try {
            String otpgenerate=randomOtp();
            // forgotRequestOtpDto.setOtp(otpgenerate);
            boolean result = otpService.forgotPassword(forgotRequestOtpDto,otpgenerate);
            System.out.println("Result "+result);
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(result);
            messageResponseDto.setStatus(HttpStatus.OK);
            System.out.println("Forgot Password OTP generated successfully for " + forgotRequestOtpDto.getPhoneNumber());
            return ResponseEntity.ok(messageResponseDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }


    @PostMapping("/forgot-password-otp-verify")
    public ResponseEntity<?> forgotPasswordVerifyUpdate(@RequestBody ForgotRequestOtpDto forgotRequestOtpDto,@RequestParam String otp) {
        try {
            // forgotRequestOtpDto.setOtp(otpgenerate);
            boolean result = otpService.forgotPasswordVerifyUpdate(forgotRequestOtpDto,otp);
            MessageResponseDto messageResponseDto = new MessageResponseDto();
            messageResponseDto.setSuccess(result);
            messageResponseDto.setStatus(HttpStatus.OK);
            System.out.println("Forgot Password OTP generated successfully for " + forgotRequestOtpDto.getPhoneNumber());
            return ResponseEntity.ok(messageResponseDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    private String randomOtp() {
        return String.valueOf((int) (Math.random() * 900_000) + 100_000);
    }




}