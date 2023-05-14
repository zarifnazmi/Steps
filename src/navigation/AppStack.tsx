// navigation/AppStack.tsx

import React from 'react';
import { 
    StyleSheet,
    Dimensions
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import WeatherScreen from '../screens/WeatherScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomTabParamList = {
    Home: undefined;
    Progress: undefined;
    Weather: undefined;
  };

const { width, height, fontScale} = Dimensions.get("window");
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function AppStack() {

  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        height: height * 0.1,
                        ...styles.shadow
                    },
                    tabBarActiveTintColor: "#57C5B6",
                    tabBarIcon: ({ focused }) => (
                        <Ionicons 
                            name="ios-home"
                            color={focused ? "#57C5B6" : 'grey'}
                            size={30}
                        />
                    ),
                }} />
        <Tab.Screen name="Progress" component={ProgressScreen} options={{
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        height: height * 0.1,
                        ...styles.shadow
                    },
                    tabBarActiveTintColor: "#57C5B6",
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons 
                            name="foot-print"
                            color={focused ? "#57C5B6" : 'grey'}
                            size={30}
                        />
                    ),
                }}/>
        <Tab.Screen name="Weather" component={WeatherScreen} options={{
                    tabBarStyle: {
                        backgroundColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        height: height * 0.1,
                        ...styles.shadow
                    },
                    tabBarActiveTintColor: "#57C5B6",
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons 
                            name="weather-partly-rainy"
                            color={focused ? "#57C5B6" : 'grey'}
                            size={30}
                        />
                    ),
                }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 30
    }
});