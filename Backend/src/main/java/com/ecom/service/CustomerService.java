package com.ecom.service;

import com.ecom.dto.ForgotPasswordDto;

public interface CustomerService {
    void resetPassword(ForgotPasswordDto dto);
}
