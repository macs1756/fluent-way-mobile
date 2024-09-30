import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home';
import CreateWords from './screens/createWord';
import LearnWords from './screens/LearnWords';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateWord" component={CreateWords} />
        <Stack.Screen name="LearnWords" component={LearnWords} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}