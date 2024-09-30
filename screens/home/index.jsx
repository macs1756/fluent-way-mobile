import { View, Text, StyleSheet, Button } from 'react-native';


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



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 60
  },
  text: {
    fontSize: 22,
    lineHeight: 24,
    margin: 30
  }
});




export default HomeScreen;