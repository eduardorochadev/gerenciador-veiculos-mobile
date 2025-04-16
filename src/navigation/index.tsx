import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import EditVehicleScreen from '../screens/EditVehicleScreen';
import AllVehiclesScreen from '../screens/AllVehiclesScreen';
import AddMaintenanceScreen from '../screens/AddMaintenanceScreen';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
        <Stack.Screen name="EditVehicle" component={EditVehicleScreen} />
        <Stack.Screen name="AllVehicles" component={AllVehiclesScreen} />
        <Stack.Screen name="AddMaintenance" component={AddMaintenanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
