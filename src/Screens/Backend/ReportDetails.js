import {
    Image,
    ImageBackground,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Functions/Context";
  

  
  const ReportDetails = ({ navigation, route }) => {
    const { increment, currentFood, decrement, navAmount, total, showCart } =
      useGlobalContext();
  

      let phoneNumber = +2348073374150

    useEffect(() => {
      let { item } = route.params;
      itemF(item);
      
    });
  
    const [count, countF] = useState(0);
    const [item, itemF] = useState(null);
  
    const [constt, consttF] = useState(null);
  
    return (
        <SafeAreaView style={styles.container}>
      <ScrollView >
        <View >
    

<Image
                source={{
                  uri: item?.item.img,
                }}
                style={{ height: 300, borderRadius: 10 }}
                resizeMode="contain"
              />
           
  
           {/* <Image
                source={require('../../../assets/po.png')}
                style={{ height: 200, borderRadius: 10, width: '100%' }}
                resizeMode='cover'
              /> */}
        
        </View>
        <View style={styles.foodBoard}>
          <View style={styles.line}></View>
          <View style={styles.NameandCount}>

            <View style={styles.name}>
              <Text style={styles.Foodname}>{item?.item.location}</Text>
              <Text style={{fontSize: 14}}>Reported by {item?.item.author}</Text>
              <Text style={{fontSize: 16, marginVertical: 20 }}>{item?.item.description}</Text>
            </View>
            
      
          </View>
          <View style={styles.checkout}>
         
         
          <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${phoneNumber}`)
          }}
         
            style={styles.checkoutBtn}
          >
            <Text style={styles.checkoutBtnTxt}>Call School Security</Text>
          </TouchableOpacity>
        </View>
          
 
        </View>
        
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ReportDetails;
  
  const styles = StyleSheet.create({
    container: {
    //   paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

      height: "100%",
  
      backgroundColor: "aliceblue",
  
    },
    foodBoard: {
      flex: 1,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: "white",
      paddingHorizontal: 20,
      marginTop: -16,
      paddingBottom: 10,
    },
    line: {
      borderRadius: 5,
      borderColor: "green",
  
      borderWidth: 2,
      width: 90,
  
      alignSelf: "center",
      marginVertical: 10,
    },
  
    NameandCount: {
    //   flexDirection: "row",
  
    //   alignItems: "center",
    },
  
    name: {
      flex: 3,
    //   marginRight: 20,
    },
    Foodname: {
      fontSize: 30,
      fontWeight: "500",
    },
  
    count: {
    //   flexDirection: "row",
      backgroundColor: "green",
      padding: 5,
      flex: 1,
    //   alignItems: "center",
    //   justifyContent: "space-between",
      borderRadius: 15,
    },
    countBtn: {
      flexDirection: "row",
      backgroundColor: "green",
      paddingHorizontal: 5,
    },
    countBtnTxt: {
      fontSize: 25,
      fontWeight: "500",
      color: "white",
    },
    checkout: {
    //   marginTop: 35,
    },
    cartDetail: {
      borderTopWidth: 1,
      borderColor: "rgb(182, 192, 199)",
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cartDetailTxt: {
      fontSize: 16,
      fontWeight: "500",
    },
    checkoutBtn: {
      backgroundColor: "red",
      alignItems: "center",
      borderRadius: 10,
      marginVertical: 10,
    },
    checkoutBtnTxt: {
      fontSize: 16,
      fontWeight: "500",
      color: "white",
      padding: 10,
    },
  });
  