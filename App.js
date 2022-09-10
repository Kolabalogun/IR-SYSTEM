
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from './src/Functions/Context';
import Navigations from './src/Functions/Navigations';
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(3814, 'WFS9IivtvDD5jAdWjBFHX4');
  return (
    <NavigationContainer>
    <AppProvider>
      <Navigations />
    </AppProvider>
    <StatusBar style="auto" />
  </NavigationContainer>
  );
}
