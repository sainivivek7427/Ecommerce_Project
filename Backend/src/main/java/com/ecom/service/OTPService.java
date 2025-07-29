package com.ecom.service;

public interface OTPService {

    public String generateSmsOtp(String phoneNumber, String deviceId);

    public String generateEmailOtp(String email, String deviceId);

    public boolean verifyEmailOtp(String email,String deviceId, String inputOtp);

    public boolean verifySmsOtp(String phoneNumber,String deviceId, String inputOtp);
}
