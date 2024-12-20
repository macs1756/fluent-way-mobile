import { useEffect } from "react";
import * as FileSystem from 'expo-file-system';
import a1Words from '../../assets/json/ua/a1.json'
import a2Words from '../../assets/json/ua/a2.json'
import b1Words from '../../assets/json/ua/b1.json'
import b2Words from '../../assets/json/ua/b2.json'

const Starter = () => {

  const pathToA1 = `${FileSystem.documentDirectory}a1.json`;
  const pathToA2 = `${FileSystem.documentDirectory}a2.json`;
  const pathToB1 = `${FileSystem.documentDirectory}b1.json`;
  const pathToB2 = `${FileSystem.documentDirectory}b2.json`;

  const copyFileToDocumentDirectory = async () => {
    const isCopiedA1 = await FileSystem.getInfoAsync(pathToA1);
    const isCopiedA2 = await FileSystem.getInfoAsync(pathToA2);
    const isCopiedB1 = await FileSystem.getInfoAsync(pathToB1);
    const isCopiedB2 = await FileSystem.getInfoAsync(pathToB2);

    if (!isCopiedA1.exists) {
      await FileSystem.writeAsStringAsync(pathToA1, JSON.stringify(a1Words));
    }

    if (!isCopiedA2.exists) {
      await FileSystem.writeAsStringAsync(pathToA2, JSON.stringify(a2Words));
    }

    if (!isCopiedB1.exists) {
      await FileSystem.writeAsStringAsync(pathToB1, JSON.stringify(b1Words));
    }

    if (!isCopiedB2.exists) {
      await FileSystem.writeAsStringAsync(pathToB2, JSON.stringify(b2Words));
    }

  }

  useEffect(() => {
    copyFileToDocumentDirectory()
  }, [])



  return null
}

export default Starter