import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Functions/Context';
import { pickImage, uploadImgetoFireStorage } from '../../Utils/DisplayImage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../../Utils/Firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Loader from '../../Components/Loader';

const ReportIncident = () => {

    const { notification, notificationF, navigation, currentUser, loader, loaderF } = useGlobalContext();
  const [DateofIncident, DateofIncidentF] = useState('');
 
  const [Description, DescriptionF] = useState("");

  const [Location, LocationF] = useState("");
  const [selectedImage, selectedImageF] = useState(null);



  console.log(DateofIncident);
  const [dateId, setdateId] = useState("");

    // to set timeId
    useEffect(() => {
        const dateId = new Date().getTime();
        const realTime = new Date().toLocaleTimeString()
        const realDate = new Date().toDateString()

        DateofIncidentF(`${realDate} ${realTime}`);

        
        setdateId(dateId);
    }, []);

   



  const handleSubmit = async (e) => {
    e.preventDefault();
 


    if (DateofIncident && Location && Description && selectedImage) {
        // if we adding new blog
        loaderF(true);

        let image;
        const { url } = await uploadImgetoFireStorage(
          selectedImage,
          `images/${dateId}`,
          "profilePicture"
        );

        image = url

        try {
            await addDoc(collection(db, "incidentReports"), {
                dateofIncident: DateofIncident,
                description: Description,
                img: image,
             
                location:Location,
                timestamp: serverTimestamp(),
                author: currentUser.email,
                userId: currentUser.uid,
                dateId: dateId,
                
            });
            loaderF(false);

        } catch (error) {
            console.log(error);
            notificationF(error);
        }

      
    } else {
        return notificationF("All fields must be filled");
    }
    navigation.navigate("SOS");
};




  const Imagepicker = async () => {
    let result = await pickImage();
    if (!result.cancelled) {
    

      selectedImageF(result.uri);
    }
  };



  


  return (
    <>

    {
      loader ? <Loader/> :
      <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Text style={styles.topText}>Report An Incident</Text>
          <Text style={styles.capText}>
  Please input the details of the incident and location.
          </Text>
        </View>
  
        <KeyboardAvoidingView style={styles.Inputs}>
  
        <TouchableOpacity
                  onPress={Imagepicker}
                  style={{
                    height: 100,
                    width: 100,
  
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
  marginVertical: 20,
                    borderRadius: 120,
                  }}
                >
                  {!selectedImage ? (
                    <View style={{ alignSelf: "center" }}>
                      <Image
                        source={require("../../../assets/photo.png")}
                        style={{
                          height: 150,
                          width: 150,
                        }}
                      />
                      <Text style={{width: '100%', textAlign: 'center'}}>Add a Picture of the Incident</Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        height: "100%",
                        width: "100%",
  
                        borderRadius: 100,
                      }}
                    />
                  )}
                </TouchableOpacity>
  
  
  
  
          <View style={{ marginTop: 20 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Date of Incident
            </Text>
            <TextInput
              value={DateofIncident}
              // onChangeText={(e) => DateofIncidentF(e)}
              placeholder="Enter the Date of Incident"
              readonly='true'
              style={styles.Input}
            />
          </View>
  
          <View style={{ marginTop: 20 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
             Subject
            </Text>
            <TextInput
              value={Location}
              onChangeText={(e) => LocationF(e)}
              placeholder="Enter the Subject of the incident"
         
              style={styles.Input}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ paddingVertical: 3, fontWeight: "600" }}>
              Description
            </Text>
  
  
            <TextInput
              value={Description}
              onChangeText={(e) => DescriptionF(e)}
              placeholder="Please enter detailed description of the incident"
              multiline
              style={styles.InputTextArea}
              numberOfLines={10}
  
            />
          </View>
  
        </KeyboardAvoidingView>
        <Text style={{ color: "red", alignSelf: "center", padding: 3 }}>
          {notification}
        </Text>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnTxt}>Report</Text>
        </TouchableOpacity>
  
  
      </ScrollView>
    </SafeAreaView>
      
    }
    
    </>

 
  )
}

export default ReportIncident

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
      InputTextArea: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 15,
        borderColor: "#aaa",

      

        // height: 170,
        alignItems: 'baseline',
        justifyContent: 'flex-start',
     
        textAlignVertical: 'top'
       
      
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
})