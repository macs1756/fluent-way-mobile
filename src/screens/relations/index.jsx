import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { playSound, shuffleArray } from '../../fn';



const RealtionWords = ({ navigation, route }) => {
  const [fileContent, setFileContent] = useState(null);
  const [selectedWorld, setSelectedWorld] = useState(null)
  const [selectedDefinitions, setSelectedDefinitions] = useState(null)
  const [finishedFlows, setFinishedFlows] = useState([])
  const [sound, setSound] = useState();

  const { difficulty } = route.params;

  const getRandomElements = (array, count) => {
    if (count > array.length) {
      throw new Error("Count exceeds array length.");
    }

    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const readFile = async () => {
    const fileUri = `${FileSystem.documentDirectory + difficulty}.json`;
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
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    readFile();
  }, []);



  const randomElementsWords = useMemo(() => {
    if (fileContent) {

      const res = getRandomElements(fileContent, 6);

      if (res) {
        return {
          words: res.map(item => item),
          definitions: shuffleArray(res.map(item => item))
        }
      }

      return {
        words: null,
        definitions: null
      }
    }
    return [];
  }, [fileContent]);


  useEffect(() => {

    if (finishedFlows.length === 6) {
      readFile()
      setFinishedFlows([])
    }

  }, [finishedFlows])

  useEffect(() => {
    if (selectedWorld && selectedDefinitions) {
      if (selectedWorld.id === selectedDefinitions.id) {
        playSound(sound, setSound)
        setSelectedWorld(null)
        setSelectedDefinitions(null)
        setFinishedFlows(prev => [...prev, selectedWorld.id])
      } else {
        setSelectedWorld(null)
        setSelectedDefinitions(null)
        Vibration.vibrate(400);
      }
    }
  }, [selectedWorld, selectedDefinitions])

  return (
    <View style={styles.container}>
      <View style={styles.half}>


        {randomElementsWords?.words && randomElementsWords.words.map(word => (
          <TouchableOpacity
            key={word.id}
            style={[styles.button,
            {
              backgroundColor: selectedWorld?.word === word.word ? 'green' : 'rgb(33, 150, 243)',
              display: finishedFlows.includes(word.id) ? 'none' : 'flex'
            }
            ]}
            onPress={() => { setSelectedWorld(word) }}
          >
            <Text style={styles.buttonText}>{word.word}</Text>
          </TouchableOpacity>
        ))}

      </View>
      <View style={styles.half}>
        {randomElementsWords.definitions && randomElementsWords.definitions.map(word => (
          <TouchableOpacity
            key={word.id}
            style={[styles.button, {
              backgroundColor: selectedDefinitions?.definition === word.definition ? 'green' : 'rgb(33, 150, 243)',
              display: finishedFlows.includes(word.id) ? 'none' : 'flex'
            }]}
            onPress={() => { setSelectedDefinitions(word) }}
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