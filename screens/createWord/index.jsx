import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreateWords = () => {
  const [wordValue, setWordValue] = useState('')
  const [wordDefinition, setWordDefinition] = useState('')


  const fileUri = `${FileSystem.documentDirectory}index.json`;

  const handleAddWord = async (newWord, newDefinition) => {
    try {
      // Перевіряємо, чи існує файл
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      let data = [];

      if (fileExists.exists) {
        // Читаємо існуючий файл
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        data = JSON.parse(fileContent);
      } else {
        // Якщо файл не існує, створюємо його
        console.log('Файл не існує. Створюємо новий файл...');
      }

      // Додаємо новий об'єкт
      const newEntry = {
        id: Date.now().toString(),
        word: newWord,
        definition: newDefinition,
      };

      data.push(newEntry);

      // Записуємо оновлений масив у файл
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));

      console.log('Новий запис додано успішно!');
      setWordValue('')
      setWordDefinition('')


    } catch (error) {
      console.error('Помилка при роботі з файлом:', error);
    }
  };



  return (
    <View style={styles.container}>

      <Text style={{ fontWeight: '500', fontSize: 20 }}>Write word:</Text>
      <TextInput
        style={styles.input}
        editable
        value={wordValue}
        onChangeText={text => setWordValue(text)}
      />

      <View style={{ height: 30 }}></View>

      <Text style={{ fontWeight: '500', fontSize: 20 }}>Write definition:</Text>
      <TextInput
        style={styles.input}
        editable
        value={wordDefinition}
        onChangeText={text => setWordDefinition(text)}
      />

      <View style={{ marginTop: 40 }}>
        <Button
          title="Add word"
          onPress={() => handleAddWord(wordValue, wordDefinition)}
        />
      </View>

    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    hight: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    width: '50%',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  }
});

export default CreateWords;