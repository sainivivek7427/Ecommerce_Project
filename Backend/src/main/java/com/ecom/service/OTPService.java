package com.ecom.service;

import com.ecom.dto.ForgotRequestOtpDto;
import com.ecom.dto.OtpRequestDto;


public interface OTPService {

    public String generateSmsOtp(String phoneNumber, String deviceId);

    public String generateEmailOtp(String email, String deviceId);

    public boolean verifyEmailOtp(String email,String deviceId, String inputOtp);

    public boolean verifySmsOtp(String phoneNumber,String deviceId, String inputOtp);

    public boolean forgotPassword(ForgotRequestOtpDto forgotRequestOtpDto,String otp);
    public boolean forgotPasswordVerifyUpdate(ForgotRequestOtpDto forgotRequestOtpDto,String otp);

    public String generateOtpbyEmailOrPhone(OtpRequestDto otpRequestDto);
}
