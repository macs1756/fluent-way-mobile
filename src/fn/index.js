import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export const removeRootFile = async (setState, fileUri) => {
  try {
    await FileSystem.deleteAsync(fileUri);
  } catch (error) {
    console.log(error);
  } finally {
    setState(true);
  }
}

export const downloadFile = async (fileUri, pathToSave) => {
  try {
    await FileSystem.downloadAsync(fileUri, pathToSave);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};


export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function playSound(soundProp, setSound) {
  const { sound } = await Audio.Sound.createAsync(
    require('../../assets/quiz-sucs.mp3')
  );
  await sound.setVolumeAsync(0.2);
  setSound(soundProp);
  await sound.playAsync();
}


export const readFile = async (setFileContent, difficulty) => {
  const fileUri = `${FileSystem.documentDirectory}${difficulty ?? 'index'}.json`;
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



export const getCordinates = (index, event, setPositions) => {
  const { x, y, width, height } = event.nativeEvent.layout;

  //console.log(event);

  const leftTop = { x, y };
  const rightTop = { x: x + width, y };
  const leftBottom = { x, y: y + height };
  const rightBottom = { x: x + width, y: y + height };

  setPositions((prev) => {
    const newPositions = [...prev];
    newPositions[index] = { leftTop, rightTop, leftBottom, rightBottom };
    return newPositions;
  });
};


export function getUniqueRandomNumbers(sourceArray, word, count) {
  const filteredArray = sourceArray.filter(num => num !== word);

  const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, count);
}