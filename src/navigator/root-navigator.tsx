import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import MapScreen from '../screens/map-screen';
import HistoryScreen from '../screens/history-screen';

export type RootParamList = {
  home: undefined;
  history: undefined;
  map: {placeId: string};
};

const Stack = createNativeStackNavigator<RootParamList>();

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="history" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
