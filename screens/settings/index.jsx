import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { styles } from '../../styles';
import { downloadFile, removeRootFile } from '../../fn';
import * as FileSystem from 'expo-file-system';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const fileUri = `${FileSystem.documentDirectory}index.json`;
  const pathToSave = FileSystem.documentDirectory + `${Date.now()}.json`;

  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <Button
        style={styles.text}
        title="Clear root file with words"
        onPress={() => removeRootFile(setModalVisible, fileUri)}
      />

      <Button
        style={styles.text}
        title="Downloading root file with words"
        onPress={() => downloadFile(fileUri, pathToSave)}
      />

      <Button
        style={styles.text}
        title={t('createNewWord')}
        onPress={() => navigation.navigate('CreateWord')}
      />


      <Modal
        transparent={false}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.modalText}>Root file with words was deleted successfully</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;