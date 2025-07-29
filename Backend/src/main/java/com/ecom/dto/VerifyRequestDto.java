package com.ecom.dto;

public class VerifyRequestDto {
    private String typevalue;
    private String otp;
    private String deviceId;

    public VerifyRequestDto(String typevalue, String otp, String deviceId) {
        this.typevalue = typevalue;
        this.otp = otp;
        this.deviceId = deviceId;
    }

    public String getTypevalue() {
        return typevalue;
    }

    public void setTypevalue(String typevalue) {
        this.typevalue = typevalue;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
