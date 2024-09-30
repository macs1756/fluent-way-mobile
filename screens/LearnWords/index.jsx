import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Vibration } from 'react-native';
//import ConfettiCannon from 'react-native-confetti-cannon';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Генеруємо випадковий індекс
    [array[i], array[j]] = [array[j], array[i]]; // Міняємо місцями елементи
  }
  return array;
}



const LearnWords = () => {
  const [fileContent, setFileContent] = useState(null);
  const [quizContent, setQuizContent] = useState(null);
  //const [showConfetti, setShowConfetti] = useState(false);

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
    if (filteredArray.length < count) {
      throw new Error(`Not enough unique numbers to choose from. Requested: ${count}, Available: ${filteredArray.length}`);
    }
    const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  const clickOnAnswers = (isCorrect) => {

    if (isCorrect) {
      // setShowConfetti(true);
    } else {
      Vibration.vibrate(400);
    }

    setTimeout(() => {
      //  setShowConfetti(false);
      setQuizContent(renderQuiz())
    }, 400)

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
              <Button
                key={Math.floor(Math.random() * 9999)}
                style={{ width: '100%' }}
                title={answer.definition ?? ''}
                onPress={() => { clickOnAnswers(answer.isCorrect) }}
              />
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
      {/* Render quiz content on button press */}
      <Button
        style={{ width: '100%' }}
        title='Render new quiz'
        onPress={() => setQuizContent(renderQuiz())}
      />
      {renderQuiz()}
      {/* {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={true}
        />
      )} */}
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
  }
});

export default LearnWords;
