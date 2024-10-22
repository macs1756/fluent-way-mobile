import { View, Button, BackHandler } from 'react-native';
import { styles } from '../../styles';
import { useTranslation } from 'react-i18next';


function DifficultyLevels({ navigation }) {

  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <Button
        style={styles.text}
        title={t('levelDifficultyMyself')}
        onPress={() => navigation.navigate('Flows', { difficulty: 'index' })}
      />

      <Button
        style={styles.text}
        title={t('levelDifficulty1')}
        onPress={() => navigation.navigate('Flows', { difficulty: 'a1' })}
      />

      <Button
        style={styles.text}
        title={t('levelDifficulty2')}
        onPress={() => navigation.navigate('Flows', { difficulty: 'a2' })}
      />



    </View>
  );
}


export default DifficultyLevels;