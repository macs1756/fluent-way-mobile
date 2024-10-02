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