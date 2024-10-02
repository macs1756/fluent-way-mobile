import { View, StyleSheet, Button } from 'react-native';
import { styles } from '../../styles';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Button
        style={styles.text}
        title="Learn"
        onPress={() => navigation.navigate('LearnWords')}
      />

      <Button
        style={styles.text}
        title="Create new words"
        onPress={() => navigation.navigate('CreateWord')}
      />

      <Button
        style={styles.text}
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />

    </View>
  );
}






export default HomeScreen;