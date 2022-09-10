
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Loader from "../Components/Loader";
import AdminReport from "../Screens/Backend/AdminReport";
import Register from "../Screens/Backend/RegisterUser";
import ReportDetails from "../Screens/Backend/ReportDetails";

import Home from "../Screens/Frontend/Home";
import Login from "../Screens/Frontend/Login";
import AdminLogin from "../Screens/Frontend/Register";
import ReportIncident from "../Screens/Frontend/ReportIncident";
import SOS from "../Screens/Frontend/SOS";
import { useGlobalContext } from "./Context";



const Stack = createNativeStackNavigator();

const Navigations = () => {

    const { currentUser } = useGlobalContext();

  return (

 

    <>
{    currentUser && currentUser.email === 'fpoly/bida/stu/001@gmail.com' ? 

<Stack.Navigator
screenOptions={{
  headerShown: false,
}}
initialRouteName={"Home"}
>

<Stack.Screen name="Home" component={Home} />
<Stack.Screen name="ReportIncident" component={ReportIncident} />
<Stack.Screen name="Loader" component={Loader} />
<Stack.Screen name="SOS" component={SOS} />

</Stack.Navigator>

: currentUser && currentUser.email === 'bida/fpoly/s/admin/001@gmail.com' ?

<Stack.Navigator

initialRouteName={"AdminReport"}
>

<Stack.Screen    options={{ headerShown: false }}  name="AdminReport" component={AdminReport} />
<Stack.Screen name="Loader" component={Loader} />
<Stack.Screen name="ReportDetails" component={ReportDetails} />


</Stack.Navigator>

:

<Stack.Navigator
screenOptions={{
  headerShown: false,
}}
initialRouteName={"Login"}
>

<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="AdminLogin" component={AdminLogin} />


</Stack.Navigator>

}
    
   

    </>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
