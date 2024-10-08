import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { readFile } from '../../fn';
import { styles } from '../../styles';
import Draggable from 'react-native-draggable';

const SplitWord = () => {
  const [wordsArr, setWordsArr] = useState([])
  const [currentWord, setCurrentWord] = useState(null)
  const [coordinates, setCoordinates] = useState([{ x: 75, y: 100 }])


  useEffect(() => {
    readFile(setWordsArr);
  }, []);

  useEffect(() => {
    if (wordsArr.length > 0) {
      setCurrentWord(wordsArr[Math.floor(Math.random() * wordsArr.length)])
    }
  }, [wordsArr])


  return (
    <View style={styles.container}>
      <Text>{currentWord?.definition}</Text>

      <View style={{ borderColor: 'black', borderWidth: 1, width: '100%' }}>
        {
          currentWord?.word && currentWord.word.split('').map((e, i) => (
            <Draggable
              key={i}
              x={i === 0 ? 0 : 140 / currentWord.word.length * i + (i * 30)}
              y={0}
              renderSize={30}
              renderColor='black'
              renderText={e}
              isCircle
            />
          ))
        }


      </View>

    </View>
  );
};




export default SplitWord;