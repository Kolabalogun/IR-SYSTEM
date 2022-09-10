import { FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../Functions/Context';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const AdminReport = () => {
    const {  navigation, handleLogout, reports, reload , handleDelete} = useGlobalContext();


  const points = reports;

  points.sort(function (a, b) {
    return b.dateId - a.dateId;
  });
    

  console.log(points);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    reload()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.TopSection}>
      <View>
        <Text style={styles.nameTxt}>Hello Admin, Welcome to</Text>
        <Text style={styles.AppTxt}>NASCOSPOLY Crime Alert App</Text>
      </View>
      <Text onPress={handleLogout}>Log Out</Text>
     
    </View>

    <View style={styles.body}>
    <FlatList
          data={points}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          keyExtractor={(item) => `${item.dateId}`}
          renderItem={(item) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ReportDetails", {
                  item,
                });
              }}
              style={styles.foods}
            >

              <View style={styles.topfeed}>
                  <Image
                source={require('../../../assets/user.png')}
                style={{ height: 20, borderRadius: 10, width: 20 }}
                resizeMode='cover'
              /> 

              <Text style={{paddingLeft: 10}}>{item.item.author}</Text>
              </View>
              <Image
                source={{
                  uri: item.item.img,
                }}
                style={{ height: 200, width: '100%'}}
                resizeMode="cover"
              />
              {/* <Image
                source={require('../../../assets/po.png')}
                style={{ height: 200, borderRadius: 10, width: '100%' }}
                resizeMode='cover'
              /> */}

           
              <View style={styles.foodTitle}>
                <Text style={styles.foodTitleTxt}>{item.item.location}</Text>
              </View>
              <View style={styles.foodDetails}>

                <Text style={styles.foodDetailsTxt}>{item.item.dateofIncident}</Text>
           
              </View>
            </TouchableOpacity>
          )}
        />
    </View>

  </View>
  )
}

export default AdminReport

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
,

      foods: {
     borderRadius: 10,
        marginVertical: 10,
        backgroundColor: 'white'
      },

      topfeed: {
        padding: 10
        ,
        borderBottomColor: '#aaa',
        borderBottomWidth : 1,
        flexDirection: 'row',
        alignItems: 'center'
        
      },
      foodStatus: {
        backgroundColor: " rgba(237, 253, 255, 0.62)",
    
        width: 110,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
      },
      foodStatusTxt: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 17,
      },
      foodTitle: {
      
        borderTopWidth: 1, borderTopColor: '#aaa' 
        ,paddingHorizontal: 10
      },
      foodTitleTxt: {
        fontSize: 20,
        paddingTop: 5,
        fontWeight: "500",
      },
      foodDetails: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'

      },
      foodDetailsTxt: {
        fontSize: 14,
        paddingVertical: 4,
       fontWeight: "300",
       paddingHorizontal: 10,
       
      },
      foodDetailsBtn: {
        fontSize: 14,
        paddingVertical: 4,
        // marginVertical: 4,
       fontWeight: "300",
    paddingHorizontal: 10,
    marginHorizontal: 10,
       backgroundColor: 'red'
      },

      
})