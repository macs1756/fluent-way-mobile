import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';

//Routes
import CreateWords from './src/screens/createWord';
import Quiz from './src/screens/quiz';
import Settings from './src/screens/settings';
import RealtionWords from './src/screens/relations';
import SplitWord from './src/screens/splitWord';
import HomeScreen from './src/screens/homeRoot';
import ChooseLevel from './src/screens/difficultyLevels';
import FlowsMenu from './src/screens/flowsMenu';

//i18n
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import Starter from './src/starter';


const Stack = createStackNavigator();

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
              },
            }),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateWord" component={CreateWords} />
          <Stack.Screen name="Quiz" component={Quiz} initialParams={{ difficulty: null }} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="RealtionWords" component={RealtionWords} />
          <Stack.Screen name="SplitWord" component={SplitWord} />
          <Stack.Screen name="Choose Level" component={ChooseLevel} />
          <Stack.Screen name="Flows" component={FlowsMenu} initialParams={{ difficulty: null }} />
        </Stack.Navigator>
        <Starter />
      </NavigationContainer>
    </I18nextProvider>
  );
}