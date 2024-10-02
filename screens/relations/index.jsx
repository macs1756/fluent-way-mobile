import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shuffleArray } from '../../fn';



const RealtionWords = () => {
  const [fileContent, setFileContent] = useState(null);
  const [random6elements, setRandon6Elements] = useState([])


  const getRandomElements = (array, count) => {
    if (count > array.length) {
      throw new Error("Count exceeds array length.");
    }

    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const readFile = async () => {
    const fileUri = `${FileSystem.documentDirectory}index.json`;
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        setFileContent(JSON.parse(content));
      } else {
        console.log('Файл не знайдено');
      }
    } catch (error) {
      console.error('Помилка при читанні файлу:', error);
    }
  };

  useEffect(() => {
    readFile();
  }, []);

  console.log(fileContent);

  useEffect(() => {
    if (fileContent) {
      const randomElements = getRandomElements(fileContent, 6);
      setRandon6Elements(randomElements)
    }

  }, [fileContent])

  return (
    <View style={styles.container}>
      <View style={styles.half}>

        {random6elements.map(word => (
          <TouchableOpacity
            key={word.id}
            style={[styles.button, { backgroundColor: 'rgb(33, 150, 243)' }]}
          // onPress={changeColor} 
          >
            <Text style={styles.buttonText}>{word.word}</Text>
          </TouchableOpacity>
        ))}

      </View>
      <View style={styles.half}>
        {shuffleArray(random6elements).map(word => (
          <TouchableOpacity
            key={word.id}
            style={[styles.button, { backgroundColor: 'rgb(33, 150, 243)' }]}
          // onPress={changeColor} 
          >
            <Text style={styles.buttonText}>{word.definition}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 6,
    width: '100%',
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  }

});

export default RealtionWords;