import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../Functions/Context';

const Home = () => {
    const {  navigation, handleLogout } = useGlobalContext();

  return (
    <View style={styles.container}>
    <View style={styles.TopSection}>
      <View>
        <Text style={styles.nameTxt}>Hello User, Welcome to</Text>
        <Text style={styles.AppTxt}>NASCOSPOLY Crime Alert App</Text>
      </View>
      <View>
        <Text onPress={handleLogout}>Log Out</Text>

      </View>
     
    </View>

    <View style={styles.body}>
        <Text style={styles.topBodyTxt}>Press down the button below to report an Incident!</Text>
<View style={styles.alert}>
<TouchableOpacity onLongPress={() => {
    navigation.navigate('ReportIncident')
}} style={styles.alertBtn}>
<Text style={styles.alertBtnTxt}>Alert!</Text>
</TouchableOpacity>
</View>
    </View>

  </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "aliceblue",
    
        flex: 1,
      },
      TopSection: {
        backgroundColor: "white",
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      nameTxt: {
        fontSize: 15,
        color: "rgb(100, 100, 100)",
        fontWeight: "500",
      },
      AppTxt: {
        fontSize: 16,
        fontWeight: "600",
      },
      body: {
     flex: 1
     ,
     padding: 20
      },
      topBodyTxt: {
        fontSize: 16,
        fontWeight: "600",
      },
      alert: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
      },
      alertBtn: {
     backgroundColor: 'red',
     borderRadius: 50
     ,
     padding: 80
      },

      alertBtnTxt: {
        fontSize: 28,
        fontWeight: "600",
        color: 'white'
      }


      
})