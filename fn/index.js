import * as FileSystem from 'expo-file-system';

export const removeRootFile = async (setState, fileUri) => {
  console.log('run');
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