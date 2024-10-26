export const removeLastLetter = (setState) => {
  setState(prev => prev.slice(0, -1))
}

export const onClickPillow = (letter, index, setState) => {
  setState(prev => [...prev, { letter, index }])
}

export const getTip = (letters, currentWord, setState) => {

  const LENGTH_TIP = Math.ceil(currentWord.word.length / 3);
  const TIP_FRAGMENT = currentWord.word.slice(0, LENGTH_TIP);

  let letterCount = {};

  const transformedFragment = TIP_FRAGMENT.split('').map(letter => {
    const upperLetter = letter.toUpperCase();

    if (!letterCount[upperLetter]) {
      letterCount[upperLetter] = 0;
    }

    const currentIndex = letters
      .filter(l => l.letter === upperLetter)
      .map(l => l.index);

    const index = currentIndex[letterCount[upperLetter]];

    letterCount[upperLetter] += 1;

    return {
      letter: upperLetter,
      index: index,
    };
  });

  setState(transformedFragment)

}