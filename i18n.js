import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: {
          rootMenuLink1: 'Вивчення',
          rootMenuLink2: 'Перевірка знань',
          rootMenuLink3: 'Налаштування',
          rootMenuLink4: 'Вихід',
          levelDifficultyMyself: 'Вивчаю власні слова',
          levelDifficulty1: 'A1',
          levelDifficulty2: 'A2',
          levelDifficulty3: 'B1',
          levelDifficulty4: 'B2',
          createNewWord: 'Створити нове слово',
          quiz: 'Опитувальник',
          relativeBetweenWords: 'Сполучення слів',
          splitWordOnLetters: 'Складання слів з букв',
          wantTip: 'Хочу підказку'
        }
      },
      ua: {
        translation: {
          rootMenuLink1: 'Вивчення',
          rootMenuLink2: 'Перевірка знань',
          rootMenuLink3: 'Налаштування',
          rootMenuLink4: 'Вихід',
          levelDifficultyMyself: 'Вивчаю власні слова',
          levelDifficulty1: 'A1',
          levelDifficulty2: 'A2',
          levelDifficulty3: 'B1',
          levelDifficulty4: 'B2',
          createNewWord: 'Створити нове слово',
          quiz: 'Опитувальник',
          relativeBetweenWords: 'Сполучення слів',
          splitWordOnLetters: 'Складання слів з букв',
          wantTip: 'Хочу підказку'
        }
      }
    },
    lng: "ua",
    fallbackLng: "ua",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
