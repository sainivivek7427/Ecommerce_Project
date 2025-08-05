// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Header from './Header';
// export default function LoginScreen() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
      
//     </SafeAreaView>
//   );
// }

import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert ,Modal} from 'react-native';

// You can import supported modules from npm
// import { Card } from 'react-native-paper';

// or any files within the Snack
// import AssetExample from './components/AssetExample';
import Header from './Header';
import { createLoginPayload } from '../DataApi/LoginPayload'; // Adjust the import path as necessary

const getDeviceId = async () => {
    let id = await SecureStore.getItemAsync('device-id');
    if (!id) {
        id = uuidv4(); // needs getRandomValues()
        await SecureStore.setItemAsync('device-id', id);
    }
    return id;
};

export default function App() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [submit,setSubmit] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [otp, setOtp] = useState('');
const [showOtp, setShowOtp] = useState(false);

const [deviceIdType, setDeviceIdType] = useState('');

    useEffect(() => {
        const fetchId = async () => {
            const id = await getDeviceId();
            setDeviceIdType(id);
        };
        fetchId();
    }, []);
  const handleLogin = async () => {
    // setSubmit((prev)=>!prev);
    if ((!username && !password) || (!phoneno && !password)) {
      console.log("Please fill in both fields.");
      Alert.alert("Error", "Please fill in both fields.");
      setSubmit((prev)=>!prev);
    } else {
      console.log("Else condtion");
      console.log("Username:", username, " Password: ", password, " Phone Number: ", phoneno);
      if(username !== "" && password !== "" && phoneno === ""){
          // Alert.alert("generate otp using email");
          console.log("generate otp using email");
          const typeValue=email;
        const deviceId=deviceIdType;

        try {
            console.log("deviceid "+deviceId);
            const response = await axios.post("http://192.168.29.35:8082/api/otp/generate-by-email", {
                typeValue,
                deviceId
            });
            Toast.show({
                type: 'success',
                text1: 'OTP sent!',
                text2: 'It will expire in 5 minutes',
                position: 'top',
                visibilityTime: 4000, // auto-hide after 4 seconds
            });



        console.log("otp sent successfull ", response.data);
            setModalVisible(true); // Open OTP modal or next step
        }
        catch (error) {
            if (error.response) {
                // Backend returned error
                console.error("Login failed:", error.response.data);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to send OTP',
                    text2:  error.response.data,
                });
                // Alert.alert("Login Failed", error.response.data);
            } else {
                // Network error
                console.error("Network error:", error.message);
                Alert.alert("Error", "Unable to reach server.");
            }
        }
      }
      if(phoneno !== "" && password!== ""  && username===""){
        // Alert.alert("generate otp using phone number"+ phoneno+"password " + password);
        console.log("generate otp using phone number"+ phoneno+"password " + password);
      }
      // const data = createLoginPayload(username, password);
      // console.log("Login Data:", data.email, data.password);
      // Alert.alert("Success", `Logged in as ${username}`);
       setUsername("");
      setPassword("");
      setPhoneno("");
      setSubmit((prev)=>!prev);
      // setShowOtp((prev)=>!prev);
       setOtpModalVisible(true);
       
      
      // Here you can add your API call to handle the login
      // For example:
      // fetch('https://your-api-endpoint.com/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then(response => response.json())
      //   .then(responseData => {
      //     console.log("Response Data:", responseData);
      //     if (responseData.success) {        
      //       Alert.alert("Success", "Logged in successfully!");
      //     } else {
      //       Alert.alert("Error", responseData.message || "Login failed.");
      //     }
      //   })
      //   .catch(error => {
      //     console.error("Login Error:", error);
      //     Alert.alert("Error", "An error occurred while logging in."); 
      //   });
      // Note: Make sure to handle the response and errors appropriately.
      // setEmail("");
      // setPassword("");
      // setSubmit(false);  // Reset submit state after handling login
      // You can also navigate to another screen after successful login
      // navigation.navigate('Home'); // Assuming you have a Home screen set up in your navigation
      // setSubmit(false);  // Reset submit state after handling login

      // Add API call here
    }
    // setShowOtp((prev) => !prev);
    // setSubmit((prev)=>!prev);
  };

  const submitOtp = () => {
    if (otp.length === 6) {
      Alert.alert("Success", "OTP submitted successfully!");
      setOtpModalVisible((prev) => !prev  );
      setOtp("");
    } else {          
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      setOtp("");
      setOtpModalVisible((prev) => !prev  );
    }
  };
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
  
  function isFormValid({ username, phoneno, password }) {
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
  return !(isUsernameValid && password.length >= 6 && isPhoneNumberValid) ;
  return (isUsernameValid && password.length >= 6) || (isPhoneNumberValid && password.length >= 6);
}

  useEffect(() => {
    // console.log("Form validation check triggered");
  // Check if the form is valid whenever username, phoneno, or password changes
  // console.log("Username:", username, "Phone Number:", phoneno, "Password:"+password);
  const valid = isFormValid({ username, phoneno, password });
  console.log("Form valid:", valid);
  setFormValid(valid);
}, [username, phoneno, password]);


  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>React Native</Text>
      </View> */}

      <Header />

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
      {username.length > 0   && (
  <>
    {username.length < 6 ? (
      <Text style={{ color: "red" }}>Username must be at least 6 characters.</Text>
    ) : <Text style={{ color: "green" }}>Username looks good</Text>}
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
              <Text style={{ color: "red" }}>Phone number should only contain digits.</Text>
            ) : phoneno.length < 10 ? (
              <Text style={{ color: "red" }}>Phone number must be 10 digits.</Text>
            ) : (
              <Text style={{ color: "green" }}>Phone number looks good</Text>
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
      <Text style={{ color: "red" }}>Password must be at least 6 characters.</Text>
    ) : null}
    {!/\d/.test(password) ? (
      <Text style={{ color: "red" }}>Password must contain at least one number.</Text>
    ) : null}
    {/* Require at least one special character */}
    {!(password.match(/[^A-Za-z0-9]/g)?.length >= 1) ? (
      <Text style={{ color: "red" }}>Password must contain at least one special character.</Text>
    ) : null}
    {/* At most one special character */}
    {(password.match(/[^A-Za-z0-9]/g)?.length > 1) ? (
      <Text style={{ color: "red" }}>Password can have at most one special character.</Text>
    ) : null}
    {/* All validations passed */}
    {password.length >= 6 &&
      /\d/.test(password) &&
      (password.match(/[^A-Za-z0-9]/g)?.length === 1) ? (
      <Text style={{ color: "green" }}>Password looks good!</Text>
    ) : null}
  </>
)}

   

      <TouchableOpacity style={[styles.button,!formValid && { backgroundColor: 'grey' }]} onPress={handleLogin}
       disabled={!formValid}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

   
      <View style={styles.linkRow}>
  <TouchableOpacity onPress={() => Alert.alert('Signup')}>
    <Text style={styles.linkText}>Signup</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
    <Text style={styles.linkText}>Forgot password?</Text>
  </TouchableOpacity>
</View>
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
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => submitOtp() }
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
