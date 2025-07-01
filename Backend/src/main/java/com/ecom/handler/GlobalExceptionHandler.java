package com.ecom.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        String message = ex.getMessage();

        // Customize response for specific message
        if (message.contains("associated with products")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("❌ Cannot delete: This category is associated with products.");
        }

        // Default message
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("❌ Error: " + message);
    }
}
