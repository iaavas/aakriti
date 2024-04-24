class Round {
  word: string;
  drawerId: string;
  guessedWords: string[];

  constructor(word: string, drawerId: string) {
    this.word = word;
    this.drawerId = drawerId;
    this.guessedWords = [];
  }

  addGuessedWord(word: string) {
    this.guessedWords.push(word);
  }
}

export default Round;
