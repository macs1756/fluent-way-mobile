import { View, Button, BackHandler } from 'react-native';
import { styles } from '../../styles';
import { useTranslation } from 'react-i18next';


function HomeScreen({ navigation }) {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <Button
        style={styles.text}
        title={t('rootMenuLink1')}
        onPress={() => navigation.navigate('Choose Level')}
      />

      <Button
        style={styles.text}
        title={t('rootMenuLink2')}
      // onPress={() => navigation.navigate('RealtionWords')}
      />
      <Button
        style={styles.text}
        title={t('rootMenuLink3')}
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        style={styles.text}
        title={"Token"}
        onPress={() => navigation.navigate('Token')}
      />

      <Button
        style={styles.text}
        title={t('rootMenuLink4')}
        onPress={() => BackHandler.exitApp()}
      />

      {/* <Button
        style={styles.text}
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      /> */}

    </View>
  );
}






export default HomeScreen;