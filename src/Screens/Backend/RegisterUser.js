import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";

  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

  import { doc, setDoc } from "firebase/firestore";

import { auth } from "../../Utils/Firebase";
import { useGlobalContext } from "../../Functions/Context";
  
  const Register = ({ navigation }) => {
    const { notification, notificationF } = useGlobalContext();
    const [email, emailF] = useState("");
    const [name, nameF] = useState("");
    const [password, passwordF] = useState("");
    const [cpassword, cpasswordF] = useState("");
    const [matricNo, matricNoF] = useState("");
    const [selectedImage, selectedImageF] = useState(null);
    const [users, usersF] = useState(null);
  
    const [loading, setloading] = useState(null);
  
    const handleSignUp = async () => {
      if (email && password && cpassword && matricNo) {
        setloading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
  
            console.log(user.uid);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            notificationF(errorMessage);
            // ..
          });
  
        // handlePicture();
        setloading(false);
      } else if (password !== cpassword) {
        notificationF("Password do not match");
      } else {
        notificationF("All field must be filled");
      }
    };
  
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.topSection}>
                <Text style={styles.topText}>Create Account</Text>
                <Text style={styles.capText}>
                  Connect with each other. Enjoy safe and private texting
                </Text>
              </View>
  
              <KeyboardAvoidingView style={styles.Inputs}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Email Address
                  </Text>
                  <TextInput
                    value={email}
                    onChangeText={(e) => emailF(e)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    style={styles.Input}
                  />
                </View>
  
                <View style={{ marginTop: 20 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Mobile Number
                  </Text>
                  <TextInput
                    value={matricNo}
                    onChangeText={(e) => matricNoF(e)}
                    placeholder="Enter your Mobile Number"
                    keyboardType="number-pad"
                    style={styles.Input}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Password
                  </Text>
                  <TextInput
                    value={password}
                    onChangeText={(e) => passwordF(e)}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    style={styles.Input}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                    Confirm Password
                  </Text>
                  <TextInput
                    value={cpassword}
                    onChangeText={(e) => cpasswordF(e)}
                    placeholder="Enter your email"
                    secureTextEntry={true}
                    style={styles.Input}
                  />
                </View>
              </KeyboardAvoidingView>
              <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
                {notification}
              </Text>
              <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                <Text style={styles.btnTxt}>Sign Up</Text>
              </TouchableOpacity>
  
       
            </ScrollView>
          </SafeAreaView>
        )}
      </>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      backgroundColor: "aliceblue",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "aliceblue",
      padding: 20,
    },
  
    topSection: {
      paddingTop: 15,
    },
    topText: {
      fontWeight: "700",
      fontSize: 25,
  
      color: "rgb(7, 1, 57)",
      marginTop: 20,
    },
    capText: {
      color: "rgb(100, 100, 100)",
      marginTop: 10,
    },
  
    Inputs: {
      marginTop: 20,
      flex: 1,
      justifyContent: "center",
    },
    Input: {
      padding: 5,
      borderRadius: 5,
      borderWidth: 1,
      fontSize: 15,
      borderColor: "#aaa",
    },
    btn: {
      paddingVertical: 12,
      backgroundColor: "rgb(20, 119, 251)",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      width: "100%",
      marginVertical: 20,
    },
    btnTxt: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
  });
  