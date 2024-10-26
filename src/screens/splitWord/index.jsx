import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { playSound, readFile, shuffleArray } from '../../fn';
import { styles } from '../../styles';
import { useTranslation } from 'react-i18next';
import { getTip, onClickPillow, removeLastLetter } from './fn';

const SplitWord = ({ route }) => {
  const [wordsArr, setWordsArr] = useState([])
  const [currentWord, setCurrentWord] = useState(null)
  const [letterArray, setLetterArray] = useState([])
  const [sound, setSound] = useState();
  const [indexedLetterList, setIndexedLetterList] = useState([])

  const { difficulty } = route.params;
  const { t } = useTranslation();
  const tranformedResult = letterArray.map(e => e.letter).join('')

  useEffect(() => {
    readFile(setWordsArr, difficulty);
  }, []);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (wordsArr.length > 0) {
      const arr = wordsArr.filter(e => !e.word.includes(' '))
      setCurrentWord(arr[Math.floor(Math.random() * arr.length)])
    }
  }, [wordsArr])

  useEffect(() => {
    if (currentWord) {
      if (currentWord.word.length === tranformedResult.length) {
        if (currentWord.word.toUpperCase() === tranformedResult.toUpperCase()) {
          playSound(sound, setSound)
          readFile(setWordsArr, difficulty);
          setLetterArray([])
        } else {
          setLetterArray([])
          Vibration.vibrate(400);
        }

      }
    }
  }, [letterArray, currentWord])

  const wordLetters = useMemo(() => {
    return currentWord?.word ? shuffleArray(currentWord.word.split('')) : [];
  }, [currentWord]);

  useEffect(() => {
    const newArray = wordLetters.map((e, i) => ({ index: i, letter: e.toUpperCase() }));
    setIndexedLetterList(newArray);
  }, [wordLetters]);


  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => getTip(indexedLetterList, currentWord, setLetterArray)}
      >
        <Text>
          {t('wantTip')}
        </Text>
      </TouchableOpacity>
      <Text style={stylesSplit.primaryText}>{currentWord?.definition}</Text>
      <View style={stylesSplit.borderDekor}></View>
      <View style={stylesSplit.pillowDefinitionContainer}>
        <Text style={stylesSplit.primaryText}>
          {tranformedResult}
        </Text>
        <TouchableOpacity
          onPress={() => removeLastLetter(setLetterArray)}
          style={{ padding: 4 }}>
          {Boolean(letterArray.length) &&
            <Image style={{ width: 24, height: 24 }} source={require('../../../assets/remove-letter.png')} />}
        </TouchableOpacity>
      </View>
      <View>
        <View style={stylesSplit.pillowContainer}>
          {
            wordLetters.map((e, i) => (
              <View
                key={i + new Date()}
                style={stylesSplit.greyPillow}
              >
                <TouchableOpacity
                  onPress={() => { onClickPillow(e.toUpperCase(), i, setLetterArray) }}
                  style={[
                    stylesSplit.greyPillowText,
                    {
                      backgroundColor: letterArray.some(l => l.index === i) ? 'transparent' : 'green',
                      pointerEvents: letterArray.some(l => l.index === i) ? 'none' : 'auto'
                    }
                  ]}>
                  <Text>
                    {e.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  );
};


const stylesSplit = StyleSheet.create({
  primaryText: {
    fontSize: 24,
    letterSpacing: 3,
  },
  pillowDefinitionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  pillowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
    width: '100%',
  },
  borderDekor: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
  },
  greyPillowText: {
    fontSize: 20,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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