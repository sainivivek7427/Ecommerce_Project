package com.ecom.serviceimpl;

import com.ecom.dto.ForgotPasswordDto;
import com.ecom.dto.OtpEntryDto;
import com.ecom.entity.Customer;
import com.ecom.repository.CustomerRepository;
import com.ecom.service.OTPService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpServiceImpl implements OTPService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;
    private final ConcurrentHashMap<String, OtpEntryDto> smsOtpMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, OtpEntryDto> emailOtpMap = new ConcurrentHashMap<>();

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    private static final long SMS_OTP_EXPIRY = 30 * 1000;    // 30 seconds
    private static final long EMAIL_OTP_EXPIRY = 2 * 60 * 1000; // 2 minutes
    private static final long MIN_REQUEST_INTERVAL_MS = 30 * 1000; // 30s

    @PostConstruct
    public void init() {
        scheduler.scheduleAtFixedRate(this::cleanupExpiredOtps, 10, 10, TimeUnit.SECONDS);
    }
    // ========== GENERATE ==========
    public synchronized String generateSmsOtp(String phoneNumber, String deviceId) {
        long now = System.currentTimeMillis();
        OtpEntryDto existing = smsOtpMap.get(phoneNumber);

        Long lastRequestTime = existing.getTimestamp();
        //check the rate limiting like avoid multiple hit in single device
        if (lastRequestTime != null && now - lastRequestTime < MIN_REQUEST_INTERVAL_MS) {
            throw new RuntimeException("❗ Wait before requesting another OTP on this device.");
        }
        if (existing != null && now - existing.getTimestamp() < SMS_OTP_EXPIRY) {
            long remaining = (SMS_OTP_EXPIRY - (now - existing.getTimestamp())) / 1000;
            throw new IllegalStateException("An OTP is already active for this number. Try again after " + remaining + " seconds.");
        }

        String otp = randomOtp();
        smsOtpMap.put(phoneNumber, new OtpEntryDto(otp, now));
        System.out.println("📲 SMS OTP for " + phoneNumber + ": " + otp);
        // send via Twilio
        sendOtpSms(phoneNumber,otp);
        System.out.println("📲 OTP for " + phoneNumber + " on device " + deviceId + ": " + otp);
        return otp;
    }
    public void sendOtpSms(String phoneNumber, String otp) {
        Twilio.init(accountSid, authToken);
        String phnoeNumberr =  "+"+phoneNumber;
        Message.creator(
                new com.twilio.type.PhoneNumber(phnoeNumberr),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                "Your OTP code is Generated successfully and your 6 digit code is "+otp+"\n valid for 10 minutes"
        ).create();
    }

    public synchronized String generateEmailOtp(String email, String deviceId) {
        long now = System.currentTimeMillis();
        OtpEntryDto existing = emailOtpMap.get(email);

        Long lastRequestTime = existing.getTimestamp();
        //check the rate limiting like avoid multiple hit in single device
        if (lastRequestTime != null && now - lastRequestTime < MIN_REQUEST_INTERVAL_MS) {
            throw new RuntimeException("❗ Wait before requesting another OTP on this device.");
        }
        if (existing != null && now - existing.getTimestamp() < EMAIL_OTP_EXPIRY) {
            long remaining = (EMAIL_OTP_EXPIRY - (now - existing.getTimestamp())) / 1000;
            throw new IllegalStateException("An OTP is already active for this email. Try again after " + remaining + " seconds.");
        }

        String otp = randomOtp();
//        send via email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Email Verification");
        message.setText("Your OTP is: " + otp + ". It is valid for 5 minutes.");
        mailSender.send(message);
        emailOtpMap.put(email, new OtpEntryDto(otp, now));
        System.out.println("📧 Email OTP for " + email + ": " + otp);
        return otp;
    }

    // ========== VERIFY ==========
    public boolean verifySmsOtp(String phoneNumber, String deviceId, String inputOtp) {
        String smsWithDeviceId = phoneNumber + "_" + deviceId;
        return verifyOtp(smsOtpMap, smsWithDeviceId, inputOtp, SMS_OTP_EXPIRY);
    }

    public boolean verifyEmailOtp(String email, String deviceId, String inputOtp) {
        String emailWithDeviceId = email+ "_" + deviceId;

        return verifyOtp(emailOtpMap, emailWithDeviceId, inputOtp, EMAIL_OTP_EXPIRY);
    }

    // ========== CLEANUP ==========
    private void cleanupExpiredOtps() {
        long now = System.currentTimeMillis();

        smsOtpMap.entrySet().removeIf(entry ->
                now - entry.getValue().getTimestamp() > SMS_OTP_EXPIRY
        );

        emailOtpMap.entrySet().removeIf(entry ->
                now - entry.getValue().getTimestamp() > EMAIL_OTP_EXPIRY
        );
    }

    // ========== HELPERS ==========
    private boolean verifyOtp(Map<String, OtpEntryDto> map, String key, String inputOtp, long expiry) {
        OtpEntryDto entry = map.get(key);
        if (entry == null || System.currentTimeMillis() - entry.getTimestamp() > expiry) {
            map.remove(key);
            return false;
        }
        boolean success = entry.getOtp().equals(inputOtp);
        if (success) {
            map.remove(key);
        }
        return success;
    }

    private String randomOtp() {
        return String.valueOf((int) (Math.random() * 900_000) + 100_000);
    }

    // Forgot Password Functionolity
    @Override
    public String forgotPassword(ForgotPasswordDto dto) {
        String username = dto.getUsername();
        String inputOtp = dto.getOtp();
        String newPassword = dto.getNewPassword();

        // 1. Check if OTP is valid
        OtpEntryDto entry = smsOtpMap.get(username);  // assuming username was used as OTP key

        if (entry == null || !entry.getOtp().equals(inputOtp)) {
            throw new RuntimeException("❌ OTP is invalid or expired.");
        }

        // 2. Find user by username
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("❌ User not found"));

        // 3. Update password (encode it!)
        customer.setPassword(passwordEncoder.encode(newPassword));
        customerRepository.save(customer);

        // 4. Remove OTP entry
        smsOtpMap.remove(username);

        return "✅ Password updated successfully.";
    }

}
