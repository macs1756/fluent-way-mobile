import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { styles } from '../../styles';
import { removeRootFile } from '../../fn';
import * as FileSystem from 'expo-file-system';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const fileUri = `${FileSystem.documentDirectory}index.json`;

  return (
    <View style={styles.container}>

      <Button
        style={styles.text}
        title="Clear root file with words"
        onPress={() => removeRootFile(setModalVisible, fileUri)}
      />

      <Button
        style={styles.text}
        title="Setting2"
      />

      <Button
        style={styles.text}
        title="Setting3"
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