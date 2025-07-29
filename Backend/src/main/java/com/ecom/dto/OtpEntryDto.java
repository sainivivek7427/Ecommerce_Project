package com.ecom.dto;

public  class OtpEntryDto {
        private String otp;

        private long timestamp;
        public OtpEntryDto(String otp, long timestamp) {
            this.otp = otp;
            this.timestamp = timestamp;
        }
        public String getOtp() {
            return otp;
        }           
        public long getTimestamp() {
            return timestamp;
        }
        public void setOtp(String otp) {
            this.otp = otp;
        }
        public void setTimestamp(long timestamp) {
            this.timestamp = timestamp;
        }
        @Override
        public String toString() {
            return "OtpEntryDto{" +
                    "otp='" + otp + '\'' +
                    ", timestamp=" + timestamp +
                    '}';        
        }

    public boolean isExpired(long ttlMillis) {
        return System.currentTimeMillis() - timestamp > ttlMillis;
    }
}
