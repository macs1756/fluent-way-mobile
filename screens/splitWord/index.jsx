import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PanResponder } from 'react-native';
import { getCordinates, readFile } from '../../fn';
import { styles } from '../../styles';
import Draggable from 'react-native-draggable';

const SplitWord = () => {
  const [wordsArr, setWordsArr] = useState([])
  const [currentWord, setCurrentWord] = useState(null)
  const [coordinates, setCoordinates] = useState([{ x: 0, y: 0 }])
  const [draggableCoordinates, setDraggableCoordinates] = useState([{ x: 0, y: 0 }])



  useEffect(() => {
    readFile(setWordsArr);
  }, []);

  useEffect(() => {
    if (wordsArr.length > 0) {
      const arr = wordsArr.filter(e => !e.word.includes(' '))
      setCurrentWord(arr[Math.floor(Math.random() * arr.length)])
    }
  }, [wordsArr])


  useEffect(() => {
    console.log(coordinates[0]);
  },)

  const moveDraggable = (event, i) => {
    const x = event?.nativeEvent.pageX
    const y = event?.nativeEvent.pageY
  console.log(y);
  }




  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, letterSpacing: 3 }}>{currentWord?.definition}</Text>
      <View>

        <View style={stylesSplit.pillowContainer}>
          {
            currentWord?.word && currentWord.word
              .split('')
              .map((e, i) => (
                <View
                  onLayout={(event) => getCordinates(i, event, setCoordinates)}
                  style={stylesSplit.greyPillow}
                >
                  <Text style={{ color: '#000' }}> </Text>
                </View>
              ))
          }

          {
            coordinates[currentWord?.word.length - 1] && currentWord?.word && currentWord.word
              .split('')
              .map((e, i) => (
                <Draggable
                  key={i}
                  x={coordinates[i]?.leftTop?.x + 12}
                  y={coordinates[i]?.leftTop?.y + 8}
                  renderSize={50}
                  fontSize={24}
                  renderColor='#3944BC'
                  isCircle
                  onDrag={(event, i) => moveDraggable(event, i)}
                >
                  <View style={{
                    width: 50,
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                    <Text
                      style={{ color: '#FFF', fontWeight: 700 }}

                    >{e}</Text>

                  </View>

                </Draggable>
              ))
          }
        </View>
      </View>
    </View>
  );
};


const stylesSplit = StyleSheet.create({
  pillowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    width: '100%',
  },
  greyPillow: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    backgroundColor: '#c5c5c5',
    borderRadius: 8,
    margin: 7,
    width: '20%',
    paddingTop: 20,
    paddingBottom: 20,
  }
})


export default SplitWord;