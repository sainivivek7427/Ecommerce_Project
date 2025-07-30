package com.ecom.dto;

public class ForgotRequestOtpDto {
    private String username;
    private String phoneNumber;
    private String deviceId;
    // This field is used to update the password after OTP verification
    private String updatePassword;

    public ForgotRequestOtpDto() {
    }       
    public ForgotRequestOtpDto(String username, String phoneNumber, String deviceId, String updatePassword) {
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.deviceId = deviceId;
        this.updatePassword = updatePassword;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }   
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getUpdatePassword() {
        return updatePassword;
    }
    public void setUpdatePassword(String updatePassword) {
        this.updatePassword = updatePassword;
    }

    public String getDeviceId() {
        return deviceId;
    }   
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public String toString() {
        return "ForgotRequestOtpDto{" +
                "username='" + username + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", deviceId='" + deviceId + '\'' +              
                ", updatePassword='" + updatePassword + '\'' +
                '}';

    }         
    
}
