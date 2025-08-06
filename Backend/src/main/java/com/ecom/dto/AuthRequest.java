package com.ecom.dto;


public class AuthRequest {
    private String typeFormat; //type "email" or "sms"
    private String typeValue; //value username or phoneno
    private String password;

    public AuthRequest(String typeFormat, String typeValue, String password) {
        this.typeFormat = typeFormat;
        this.typeValue = typeValue;
        this.password = password;
    }

    public AuthRequest() {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
