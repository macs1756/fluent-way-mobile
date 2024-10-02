import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home';
import CreateWords from './screens/createWord';
import Quiz from './screens/quiz';
import Settings from './screens/settings';
import RealtionWords from './screens/relations';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateWord" component={CreateWords} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="RealtionWords" component={RealtionWords} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}