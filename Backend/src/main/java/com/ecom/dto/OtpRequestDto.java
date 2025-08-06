package com.ecom.dto;

public class OtpRequestDto {
    private String typeFormat; //format "email" or "sms"
    private String typeValue;// "email value" or "phoneno"
    private String deviceId;
    private String password;
    public OtpRequestDto() {
    }

    public OtpRequestDto(String typeFormat, String typeValue, String deviceId, String password) {
        this.typeFormat = typeFormat;
        this.typeValue = typeValue;
        this.deviceId = deviceId;
        this.password = password;
    }

    public String getTypeFormat() {
        return typeFormat;
    }

    public void setTypeFormat(String typeFormat) {
        this.typeFormat = typeFormat;
    }

    public String getTypeValue() {
        return typeValue;
    }

    public void setTypeValue(String typeValue) {
        this.typeValue = typeValue;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
