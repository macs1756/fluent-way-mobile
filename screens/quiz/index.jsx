import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Vibration } from 'react-native';
import { playSound, readFile, shuffleArray } from '../../fn';


const LearnWords = () => {
  const [fileContent, setFileContent] = useState(null);
  const [quizContent, setQuizContent] = useState(null);
  const [sound, setSound] = useState();


  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  useEffect(() => {
    readFile(setFileContent);
  }, []);


  function getUniqueRandomNumbers(sourceArray, word, count) {
    const filteredArray = sourceArray.filter(num => num !== word);

    const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  }

  const clickOnAnswers = (isCorrect) => {
    if (isCorrect) {
      playSound(sound, setSound)
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

      const uniqueRandomNumbers = getUniqueRandomNumbers(fileContent, randomWord, 5);
      let answers = uniqueRandomNumbers.map(e => ({ ...e, isCorrect: false }))
      answers = [...answers, { ...randomWord, isCorrect: true }]
      answers = shuffleArray(answers)

      return (
        <View>
          <View>
            <Text style={styles.mainWord}>
              {randomWord.word}
            </Text>
            <Text>{fileContent.length ?? 0} words</Text>
          </View>

          {
            answers.map((answer) => (
              <View key={answer.id} style={{ margin: 6 }}>
                <Button
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

  useEffect(() => {
    setQuizContent(renderQuiz())
  }, [fileContent])

  return (
    <View
      style={{ height: '100%' }}
    >
      {quizContent}
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
