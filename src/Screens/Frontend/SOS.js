import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const SOS = ({ navigation }) => {

    let phoneNumber = +2348073374150

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/po.png')}
        style={{ height: 300, width: 300 }}
        resizeMode='stretch'
      />

      <Text style={{ fontSize: 14, textAlign: 'center' }}>
       Thank you for notifying us. A Unit of School Authority will be there soon. 
      </Text>
      <TouchableOpacity
        onPress={() => {
            Linking.openURL(`tel:${phoneNumber}`)
        }}
        style={styles.checkoutBtnRed}
      >
        <Text style={styles.checkoutBtnTxt}>Call School Security</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.checkoutBtn}
      >
        <Text style={styles.checkoutBtnTxt}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "aliceblue",
  },
  checkoutBtnRed: {
    backgroundColor: "red",
    // alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: '100%'
    ,
    textAlign: 'center'
  },
  checkoutBtn: {
    backgroundColor: "green",
    // alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: '100%'
    ,
    textAlign: 'center'
  },
  checkoutBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    padding: 10,
    textAlign: 'center'
  },
});
