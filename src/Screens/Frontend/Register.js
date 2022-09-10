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
  import React, { useState } from "react";

  import { signInWithEmailAndPassword } from "firebase/auth";

import { useGlobalContext } from "../../Functions/Context";
import { auth } from "../../Utils/Firebase";
  
  const AdminLogin = ({ navigation }) => {
    const { notification, notificationF } = useGlobalContext();
  
    const [adminID, adminIDF] = useState("");

    let adminEmail = `${adminID}@gmail.com`
  
    const [password, passwordF] = useState("");
  
    const handleSignIn = () => {
      if (adminID && password) {
        signInWithEmailAndPassword(auth, adminEmail, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            notificationF(errorMessage);
          });
      } else {
        notificationF("All field must be filled");
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("../../../assets/bida.jpeg")}
            style={{ height: 30, width: 30 }}
          />
          <Text style={styles.logoTxt}>NASCOSPOLY</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.topSection}>
            <Text style={styles.topText}>Welcome! 👋</Text>
            <Text style={styles.capText}>Sign In your Admin ID and Password to continue!</Text>
          </View>
          <View style={styles.Inputs}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
                Admin ID
              </Text>
              <TextInput
                value={adminID}
                onChangeText={(e) => adminIDF(e)}
                placeholder="Enter your AdminID"
              
                style={styles.Input}
              />
            </View>
  
            <View style={{ marginTop: 10 }}>
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
          </View>
  
          <Text style={{ color: "red", alignSelf: "center" }}>
            {notification}
          </Text>
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            <Text style={styles.btnTxt}>Sign In</Text>
          </TouchableOpacity>

          <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text>Are you a student?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "rgb(20, 119, 251)", fontWeight: "600" }}>
              {" "}
              Student Sign In
            </Text>
          </TouchableOpacity>
        </View>
       
        </View>
      </SafeAreaView>
    );
  };
  
  export default AdminLogin;
  
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "aliceblue",
      padding: 20,
      flex: 1,
    },
    topSection: {
      paddingTop: 20,
      // flex: 1,
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
      // flex: 1,
  
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
      marginVertical: 30,
    },
    btnTxt: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
    logo: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    logoTxt: {
      color: "#020E79",
      fontSize: 17,
      fontWeight: "500",
      paddingHorizontal: 5,
    },
  });
  