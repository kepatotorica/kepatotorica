export enum Color {
  Nothing = -1,
  Grey = 0,
  Yellow = 1,
  Green = 2,
}

export class Position {
  Letter: string = "";
  Color: Color = Color.Nothing;
  Index: number;

  constructor(letter: string, color: Color, index: number) {
    this.Letter = letter;
    this.Color = color;
    this.Index = index;
  }
}
