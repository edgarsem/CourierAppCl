import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PostProvider } from './src/contexts/PostContext';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NewDeliveryParcelDetailsScreen from './src/screens/NewDeliveryParcelDetailsScreen';
import NewDeliveryRecipientScreen from './src/screens/NewDeliveryRecipientScreen';
import NewDeliveryCheckOutScreen from './src/screens/NewDeliveryCheckOutScreen';
import DeliveryStatusScreen from './src/screens/DeliveryStatusScreen';
import DeliveryCompletedScreen from './src/screens/DeliveryCompletedScreen';
import DeliveryHistory from './src/screens/DeliveryHistory';
import DeliveryCanceledScreen from './src/screens/DeliveryCanceledScreen';


const Stack = createNativeStackNavigator();


function MyStack() {
  return(
    <Stack.Navigator 
    initialRouteName='Login'
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen
        name = "Login"
        component = { LoginScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Register"
        component = { RegisterScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Home"
        component = { MainScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "History"
        component = { DeliveryHistory }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Profile"
        component = { ProfileScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "New Delivery Form 1#"
        component = { NewDeliveryParcelDetailsScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "New Delivery Form 2#"
        component = { NewDeliveryRecipientScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "New Delivery Checkout"
        component = { NewDeliveryCheckOutScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Delivery Status"
        component = { DeliveryStatusScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Delivery Completed"
        component = { DeliveryCompletedScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name = "Delivery Canceled"
        component = { DeliveryCanceledScreen }
        options = {{
          animation: 'fade',
          headerStyle: {
            backgroundColor: '#176B87',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PostProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </PostProvider>
  );
}
