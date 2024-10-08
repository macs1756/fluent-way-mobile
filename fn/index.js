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

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function playSound(soundProp, setSound) {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/quiz-sucs.mp3')
  );
  await sound.setVolumeAsync(0.2);
  setSound(soundProp);
  await sound.playAsync();
}


export const readFile = async (setFileContent) => {
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