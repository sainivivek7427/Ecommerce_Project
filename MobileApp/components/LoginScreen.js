import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Modal} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values'; // 👈 MUST come before uuid
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
// or any files within the Snack
// import AssetExample from './components/AssetExample';
import Header from './Header';
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getDeviceId = async () => {
    let id = await SecureStore.getItemAsync('device-id');

    if (!id) {
        id = uuidv4();
        await SecureStore.setItemAsync('device-id', id);
    }

    return id;
};

export default function LoginScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [submit, setSubmit] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [type, setType] = useState('');
    const [deviceIdType, setDeviceIdType] = useState('');

    const navigation = useNavigation();
    useEffect(() => {
        console.log("Running login screen");
        const fetchId = async () => {
            try {
                const id = await getDeviceId();
                console.log("✅ Device ID fetched:", id);
                setDeviceIdType(id);
            } catch (e) {
                console.error("❌ Device ID error:", e);
            }
        };
        fetchId();
    }, []); // run once on mount

    useEffect(() => {
        const valid = isFormValid({username, phoneno, password});
        // console.log("Form valid:", valid);
        setFormValid(valid);

    }, [username, phoneno, password]);

    const errorHandling = (error) => {
        if (error.response) {
            // Backend returned error status (400, 500, etc.)
            console.log("Backend error:", error.response.data);

            // If backend returned plain text (e.g., "Username not found")
            if (typeof error.response.data === "string") {
                // Alert.alert("Error", error.response.data);
                Toast.show({
                    type: 'error',
                    text1: 'Error !',
                    text2: error.response.data,
                });
            }
            // If backend returned JSON object
            else if (error.response.data.message) {
                // Alert.alert("Error", error.response.data.message);
                Toast.show({
                    type: 'error',
                    text1: 'Error !',
                    text2: error.response.data.message,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error !',
                    text2: "Unexpected Error !",
                });
                // Alert.alert("Error", "Unexpected Error");
            }

        } else if (error.request) {
            // No response from server
            console.error("No response:", error.request);
            Toast.show({
                type: 'error',
                text1: 'Error !',
                text2: "No Response From server! ...",
            });
            // Alert.alert("Error", "No response from server.");
        } else {
            // Axios internal error
            Toast.show({
                type: 'error',
                text1: 'Error !',
                text2: error.message,
            });
            console.error("Error setting up request:", error.message);
            Alert.alert("Error", "Something went wrong.");
        }
    }

    const sendOtp = async () => {
        // setSubmit((prev)=>!prev);
        Toast.show({
            type: 'success',
            text1: 'Request Sent!',
            text2: 'Wait for 2-5 seconds',
        });
        setFormValid(false);

        if ((!username && !password) || (!phoneno && !password)) {
            console.log("Please fill in both fields.");
            // Alert.alert("Error", "Please fill in both fields.");
            Toast.show({
                type: 'error',
                text1: 'Empty Fields',
                text2: 'Please fill both fields',
                position: 'top',
                visibilityTime: 4000, // auto-hide after 4 seconds
            });
            setSubmit((prev) => !prev);
        } else {
            console.log("Else condtion");
            console.log("Username:", username, " Password: ", password, " Phone Number: ", phoneno);
            let otpRequestPayload = {};
            if (username !== "" && password !== "" && phoneno === "") {
                // Alert.alert("generate otp using email");
                setType('email');
                otpRequestPayload = {
                    typeFormat: "email",
                    typeValue: username,
                    deviceId: deviceIdType,
                    password: password
                }
                console.log("payload data  by email " + otpRequestPayload.deviceId);

            } else if (phoneno !== "" && password !== "" && username === "") {
                setType('sms');
                otpRequestPayload = {
                    typeFormat: "sms",
                    typeValue: phoneno,
                    deviceId: deviceIdType,
                    password: password
                }
                console.log("payload data  by sms " + otpRequestPayload);

            }
            try {
                // console.log("deviceid " + deviceId);
                const response = await axios.post("http://192.168.29.35:8082/api/otp/generate", otpRequestPayload);
                Toast.show({
                    type: 'success',
                    text1: 'OTP sent !',
                    text2: response.data.message,
                    position: 'top',
                    visibilityTime: 4000, // auto-hide after 4 seconds
                });


                console.log("otp sent successfull ", response.data);
                if (response.data && response.data.status === "ACCEPTED") {
                    setOtpModalVisible(true) // Open OTP modal or next step
                }

            } catch (error) {
                errorHandling(error);
                setFormValid(false);
                setSubmit((prev) => !prev);

            }
        };
    }

    const submitOtpAndVerifyLogin = async () => {
        console.log('Entered OTP:', otp);
        console.log("deviceid " + deviceIdType);
        console.log('Logged in as username ' + username + " password " + password + " otp " + otp);
        let response = null;

        try {
            const typeValue = username;
            // Use already available deviceId instead of redeclaring
            console.log("Email " + username);
            if (type === 'email') {
                response = await axios.post("http://192.168.29.35:8082/api/otp/verify-email", {
                    typevalue: username,      // 👈 matches backend field name
                    otp: otp,
                    deviceId: deviceIdType
                });
                console.log("Email otp verify  " + response.data);
            } else if (type === 'sms') {
                console.log("Phone no "+phoneno);

                response = await axios.post("http://192.168.29.35:8082/api/otp/verify-sms", {
                    typevalue: phoneno,      // 👈 matches backend field name
                    otp: otp,
                    deviceId: deviceIdType
                });
                console.log("Phone sms verify  " + response.data);
            }

            console.log("verify ", response.data);


        } catch (error) {
            errorHandling(error);
        };

        if (response.data.success === true) {
            try {
                let loginpayload={};
                if(type === 'sms') {
                    loginpayload={
                        typeFormat:"sms",
                        typeValue:phoneno,
                        password:password
                    }
                }
                else if(type === 'email') {
                    loginpayload={
                        typeFormat:"email",
                        typeValue:username,
                        password:password
                    }
                }
                // const username = username;
                const responselogin = await axios.post("http://192.168.29.35:8082/api/auth/login", loginpayload);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully Login',
                    text2: 'Now Redirect to Home page',
                });
                const {token, refreshToken} = responselogin.data;
                console.log("token " + token);
                console.log("Refresh token " + refreshToken);


                // Save tokens to AsyncStorage
                await AsyncStorage.setItem("accessToken", token);
                await AsyncStorage.setItem("refreshToken", refreshToken);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                setOtpModalVisible(false); // Close OTP modal
            } catch (error) {
                errorHandling(error);
            }
        } else {
            Alert.alert("Invalid OTP", "Please enter the correct OTP.");
        }
        setUsername('');
        setPassword('');
        setPhoneno('');
        setOtp('');
        setFormValid(true);
    }

    const signup=()=>{
            Toast.show({
                type: 'success',
                text1: 'Failed to send OTP',
                text2: 'Hello signup',
            });

    }
//   function isFormValid() {
//   // Username validation
//   if (username.length < 6 && password.length<6) return false;
//   // Password validations
//   // if (password.length < 6) return false;
//   if (!/\d/.test(password)) return false;
//   const specialCount = password.match(/[^A-Za-z0-9]/g)?.length || 0;
//   if (specialCount !== 1) return false;
//   return true;
// }

        function isFormValid({username, phoneno, password}) {
            // Username Validation: Must be at least 6 characters long
            const isUsernameValid = username.length >= 6;

            // Phone number Validation: Must be exactly 10 digits (no special characters or letters)
            const isPhoneNumberValid = /^[0-9]{10}$/.test(phoneno);

            // Password Validation:
            // 1. Must be at least 6 characters
            // 2. Must contain at least 1 digit
            // 3. Must contain exactly 1 special character
            if (password.length < 6) return false;

            // Count digits in the password
            const digitCount = password.replace(/[^0-9]/g, '').length;
            if (digitCount === 0) return false; // Ensure at least 1 digit

            // Count special characters in the password
            const specialCount = password.match(/[^A-Za-z0-9]/g)?.length || 0;
            if (specialCount !== 1) return false; // Ensure exactly 1 special character

            // The form is valid if either:
            // - The username is valid and password is valid
            // - OR the phone number is valid and password is valid
            return !(isUsernameValid && password.length >= 6 && isPhoneNumberValid);
            return (isUsernameValid && password.length >= 6) || (isPhoneNumberValid && password.length >= 6);
        }


        return (
            <View style={styles.container}>
                {/* <View style={styles.header}>
        <Text style={styles.headerText}>React Native</Text>
      </View> */}

                <Header/>

                <Text style={styles.title}>Login</Text>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="user@123"
                    value={username}
                    onChangeText={setUsername}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {username.length > 0 && (
                    <>
                        {username.length < 6 ? (
                            <Text style={{color: "red"}}>Username must be at least 6 characters.</Text>
                        ) : <Text style={{color: "green"}}>Username looks good</Text>}
                    </>
                )}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="1234567890"
                    value={phoneno}
                    onChangeText={setPhoneno}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
                {phoneno.length > 0 && (
                    <>
                        {/* Check if phone number contains non-numeric characters */}
                        {/\D/.test(phoneno) ? (
                            <Text style={{color: "red"}}>Phone number should only contain digits.</Text>
                        ) : phoneno.length < 10 ? (
                            <Text style={{color: "red"}}>Phone number must be 10 digits.</Text>
                        ) : (
                            <Text style={{color: "green"}}>Phone number looks good</Text>
                        )}
                    </>
                )}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="password@123"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {/* Password validation message */}
                {/* Password validation message */}
                {password.length > 0 && (
                    <>
                        {password.length < 6 ? (
                            <Text style={{color: "red"}}>Password must be at least 6 characters.</Text>
                        ) : null}
                        {!/\d/.test(password) ? (
                            <Text style={{color: "red"}}>Password must contain at least one number.</Text>
                        ) : null}
                        {/* Require at least one special character */}
                        {!(password.match(/[^A-Za-z0-9]/g)?.length >= 1) ? (
                            <Text style={{color: "red"}}>Password must contain at least one special character.</Text>
                        ) : null}
                        {/* At most one special character */}
                        {(password.match(/[^A-Za-z0-9]/g)?.length > 1) ? (
                            <Text style={{color: "red"}}>Password can have at most one special character.</Text>
                        ) : null}
                        {/* All validations passed */}
                        {password.length >= 6 &&
                        /\d/.test(password) &&
                        (password.match(/[^A-Za-z0-9]/g)?.length === 1) ? (
                            <Text style={{color: "green"}}>Password looks good!</Text>
                        ) : null}
                    </>
                )}


                <TouchableOpacity style={[styles.button, !formValid && {backgroundColor: 'grey'}]} onPress={sendOtp}
                                  disabled={!formValid}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>


                <View style={styles.linkRow}>
                    <TouchableOpacity onPress={signup}>
                        <Text style={styles.linkText}>Signup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
                        <Text style={styles.linkText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <Toast />
                <Modal
                    visible={otpModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setOtpModalVisible(false)}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            width: '80%'
                        }}>
                            <Text style={styles.label}>Enter OTP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter OTP"
                                value={otp}
                                onChangeText={setOtp}
                                keyboardType="numeric"
                                maxLength={6}
                            />
                            <TouchableOpacity
                                style={[styles.button, {marginTop: 20}]}
                                onPress={ submitOtpAndVerifyLogin}
                            >
                                <Text style={styles.buttonText}>Submit OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 20,
    marginTop:"0"
  },
  header: {
    backgroundColor: 'lightgreen',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  linkRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 15,
  paddingHorizontal: 5,
},
linkText: {
  color: 'white',
  fontSize: 14,
  backgroundColor:"#60B5FF",
  padding:10,
  borderRadius:15
}
});
