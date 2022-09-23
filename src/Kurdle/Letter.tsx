export class Letter {
  Letter: string = '';
  Accuracy: number = -1; //-1 is no entry, 0 is grey, 1 is yellow, 2 is green

  constructor(letter: string, accuracy: number) {
    this.Letter = letter;
    this.Accuracy = accuracy;
  }

  IncrementAccuracy = () => {
    console.log('BEFORE: ' + this.Accuracy);
    this.Accuracy++;
    if (this.Accuracy === 3) {
      this.Accuracy = 0;
    }
    console.log('AFTER: ' + this.Accuracy);
  };
}
