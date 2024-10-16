import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateWords from './screens/createWord';
import Quiz from './screens/quiz';
import Settings from './screens/settings';
import RealtionWords from './screens/relations';
import SplitWord from './screens/splitWord';

//i1
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

import HomeScreen from './screens/homeRoot';
import ChooseLevel from './screens/difficultyLevels';
import FlowsMenu from './screens/flowsMenu';


const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateWord" component={CreateWords} />
          <Stack.Screen name="Quiz" component={Quiz} initialParams={{ difficulty: null }} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="RealtionWords" component={RealtionWords} />
          <Stack.Screen name="SplitWord" component={SplitWord} />
          <Stack.Screen name="Choose Level" component={ChooseLevel} />
          <Stack.Screen name="Flows" component={FlowsMenu} initialParams={{ difficulty: null }} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}