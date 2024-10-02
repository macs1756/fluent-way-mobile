import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Vibration } from 'react-native';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



const LearnWords = () => {
  const [fileContent, setFileContent] = useState(null);
  const [quizContent, setQuizContent] = useState(null);

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



  function getUniqueRandomNumbers(sourceArray, selectedNumber, count) {
    const filteredArray = sourceArray.filter(num => num !== selectedNumber);

    const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  const clickOnAnswers = (isCorrect) => {

    if (isCorrect) {
      setTimeout(() => {
        setQuizContent(renderQuiz())
      }, 400)
    } else {
      Vibration.vibrate(400);
    }

  }

  const renderQuiz = () => {
    if (fileContent && Array.isArray(fileContent)) {
      const randomIndex = Math.floor(Math.random() * fileContent.length);
      const randomWord = fileContent[randomIndex];

      const uniqueRandomNumbers = getUniqueRandomNumbers(fileContent, randomIndex, 5);

      let answers = uniqueRandomNumbers.map(e => ({ ...e, isCorrect: false }))
      answers = [...answers, { ...randomWord, isCorrect: true }]


      answers = shuffleArray(answers)

      return (
        <View>
          <Text style={styles.mainWord}>
            {randomWord.word}
          </Text>

          {
            answers.map((answer, i) => (
              <View style={{margin: 6}}>
                <Button
                  key={Math.floor(Math.random() * 9999)}
                  style={{ width: '100%' }}
                  title={answer.definition ?? ''}
                  onPress={() => { clickOnAnswers(answer.isCorrect) }}
                />
              </View>
            ))
          }

        </View>
      );
    } else {
      return <Text>Файл не містить даних або його не знайдено</Text>;
    }
  };

  return (
    <View
      style={{ height: '100%' }}
    >
      {renderQuiz()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWord: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
  }
});

export default LearnWords;
