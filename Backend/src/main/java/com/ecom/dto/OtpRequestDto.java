package com.ecom.dto;

public class OtpRequestDto {

    private String typeValue;// "email" or "phone"
    private String deviceId;
    public OtpRequestDto() {
    }


    public OtpRequestDto(String typeValue, String deviceId) {
        this.typeValue = typeValue;
        this.deviceId = deviceId;
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
}
