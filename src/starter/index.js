import { useEffect } from "react";
import { pathToA1, pathToA2 } from "../con";
import * as FileSystem from 'expo-file-system';
import a1Words from '../../assets/json/ua/a1.json'
import a2Words from '../../assets/json/ua/a2.json'

const Starter = () => {

  const copyFileToDocumentDirectory = async () => {
    const isCopiedA1 = await FileSystem.getInfoAsync(pathToA1);
    const isCopiedA2 = await FileSystem.getInfoAsync(pathToA2);

    if (!isCopiedA1.exists) {
      await FileSystem.writeAsStringAsync(pathToA1, JSON.stringify(a1Words));
    }

    if (!isCopiedA2.exists) {
      await FileSystem.writeAsStringAsync(pathToA2, JSON.stringify(a2Words));
    }

  }

  useEffect(() => {
    copyFileToDocumentDirectory()
  }, [])



  return null
}

export default Starter