package com.ecom.dto;

import org.springframework.http.HttpStatus;

public class OtpResponseDto {

    private String message;
    private HttpStatus status;

    public OtpResponseDto(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
