
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { LogBox } from "react-native";
import { auth, db } from "../Utils/Firebase";


const AppContext = React.createContext();


LogBox.ignoreLogs([
    "Setting a timer",
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  ]);



const AppProvider = ({ children }) => {

    const [currentUser, currentUserF] = useState(null);
    const [notification, notificationF] = useState("");

  //   notification
  useEffect(() => {
    const timeoutt = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => {
      clearInterval(timeoutt);
    };
  }, [notification]);

    // check if user is signed In
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            currentUserF(user);
          } else {
            currentUserF(null);
          }
        });
      }, []);

       //   logging out user
  const handleLogout = () => {
    signOut(auth).then(() => {
      currentUserF(null);
    });
  };

//   console.log(currentUser?.email);

    const navigation = useNavigation();

    const [reports, reportsF] = useState([]);

    useEffect(() => {
   
      const unsub = onSnapshot(
        collection(db, "incidentReports"),
  
        (snapshot) => {
          let list = [];
  
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          reportsF(list);

  
          // console.log("ghghffd");
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
      };
    }, []);

    function reload() {
        const unsub = onSnapshot(
            collection(db, "incidentReports"),
      
            (snapshot) => {
              let list = [];
      
              snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
              });
              reportsF(list);
    
      
              console.log(list);
            },
            (error) => {
              console.log(error);
            }
          );
      
          return () => {
            unsub();
          };
    }

      // to delete blogs
  const handleDelete = async (id) => {

      try {
        loaderF(true);
        await deleteDoc(doc(db, "incidentReports", id));
        loaderF(false);
       
       
      } catch (error) {
        console.log(error);
      }
    
  };


    const [loader, loaderF] = useState(false)

  return (
    <AppContext.Provider
      value={{
        currentUser,
        notification,
        notificationF,
        handleLogout,
        navigation,
        handleLogout,
        reports,
        reload,
        loader, loaderF,
        handleDelete
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
