import { View, Button } from 'react-native';
import { styles } from '../../styles';
import { useTranslation } from 'react-i18next';


function FlowsMenu({ navigation, route }) {

  const { difficulty } = route.params;
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Button
        style={styles.text}
        title={t('quiz')}
        onPress={() => navigation.navigate('Quiz', { difficulty })}
      />
      <Button
        style={styles.text}
        title={t('relativeBetweenWords')}
        onPress={() => navigation.navigate('RealtionWords', { difficulty })}
      />
      <Button
        style={styles.text}
        title={t('splitWordOnLetters')}
        onPress={() => navigation.navigate('SplitWord', { difficulty })}
      />
    </View>
  );
}





export default FlowsMenu;