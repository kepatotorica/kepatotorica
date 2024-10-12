import LetterSlot from "./LetterSlot";
import { Color, Position } from "./Position";
import { deepCopy } from "../Utilities/deepCopy";
import Grid from "@mui/material/Grid";
import "./Kurdle.css";
import { trimWords, words } from "./WordProcessor";
import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type MyState = {
  gridList: Position[][];
  wordList: string[];
  anchorEl: HTMLButtonElement | null;
  buttonPressed: string;
};

const letterSlotRefs: React.RefObject<HTMLInputElement>[][] = Array.from({ length: 6 }, () =>
  Array(5).fill(React.createRef<HTMLInputElement>())
);

function createStartingGrid(): Position[][] {
  let rows: Position[][] = new Array(6);
  for (let index = 0; index < rows.length; index++) {
    let columnPosition: number = 0;
    rows[index] = Array(5)
      .fill(new Position("", -1, 0))
      .map((el: Position) => ({ ...el, Index: columnPosition++ }));
  }

  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      letterSlotRefs[rowIndex] = letterSlotRefs[rowIndex] || [];
      letterSlotRefs[rowIndex][colIndex] = React.createRef<HTMLInputElement>();
    });
  });

  return rows;
}

const initialState: MyState = {
  gridList: createStartingGrid(),
  wordList: [],
  anchorEl: null,
  buttonPressed: "",
};

class Kurdle extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  filterWords() {
    let calculatedWordList = words;
    let greenLetters: Position[] = [];

    this.state.gridList.forEach((row) => {
      row.forEach((letter) => {
        let overlappingLetters = greenLetters.filter((greenLetter) => greenLetter.Letter === letter.Letter);
        if (overlappingLetters.length > 0) {
          if (letter.Color !== Color.Grey) {
            // If we have a grey letter that is the same as a green then don't filter out words that only have one of that letter.
            //TODOASDF: if we have a yellow, and a green, then we need to only find words where there are both the green and another occurance of the same
            // letter in the word right now the way I have it written would mean making some changes to how the processing gets done. I am just a little too
            // lazy right now to fix that
            calculatedWordList = trimWords(letter, calculatedWordList);
          }
        } else {
          calculatedWordList = trimWords(letter, calculatedWordList);
        }

        if (letter.Color === Color.Green) {
          greenLetters = greenLetters.concat(letter);
        }
      });
    });

    this.setState({ wordList: calculatedWordList });
  }

  updateColorForPosition(row: number, col: number): void {
    let copiedGridOfLetters: Position[][] = deepCopy(this.state.gridList);
    const selectedLetter = copiedGridOfLetters[row][col];
    if (selectedLetter.Letter !== "") {
      if (++selectedLetter.Color > Color.Green) {
        selectedLetter.Color = Color.Grey;
      }
      this.setState({ gridList: deepCopy(copiedGridOfLetters) }, this.filterWords);
    }
  }

  inputChanged(row: number, col: number, activeInput: string) {
    let copiedGridOfLetters: Position[][] = deepCopy(this.state.gridList);
    const currentCell = copiedGridOfLetters[row][col];
    if (activeInput === "") {
      currentCell.Letter = "";
      currentCell.Color = Color.Nothing;
    } else {
      currentCell.Letter = activeInput;

      let setTheInitialColorWhenWeAddALetter = currentCell.Color === Color.Nothing;
      if (setTheInitialColorWhenWeAddALetter) {
        currentCell.Color = Color.Grey;
      }

      const nextRowIndex = row;
      const nextColIndex = col + 1;

      if (nextColIndex < this.state.gridList[nextRowIndex].length) {
        letterSlotRefs[nextRowIndex][nextColIndex].current?.focus();
      } else if (nextRowIndex < this.state.gridList.length - 1) {
        letterSlotRefs[nextRowIndex + 1][0].current?.focus();
      }
    }

    if (activeInput !== " ") {
      this.setState({ gridList: deepCopy(copiedGridOfLetters) }, this.filterWords);
    }
  }

  handleKeyPressed(row: number, col: number, keyPressed: string) {
    const currentCell = this.state.gridList[row][col];
    const shouldNavBack = keyPressed === "Backspace" && currentCell.Letter === "";
    if (shouldNavBack) {
      let prevRowIndex = row;
      let prevColIndex = col - 1;

      if (prevColIndex < 0) {
        prevColIndex = this.state.gridList[0].length - 1;
        prevRowIndex--;
      }
      if (prevRowIndex < 0) {
        prevRowIndex = 0;
        prevColIndex = 0;
      }
      letterSlotRefs[prevRowIndex][prevColIndex].current?.focus();
    }
  }

  render() {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    const handleClose = () => {
      this.setState({ anchorEl: null });
    };

    const open = Boolean(this.state.anchorEl);
    const helpButton = open ? "simple-popover" : undefined;

    return (
      <div>
        <div className="container">
          <Popover
            id={helpButton}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{
                p: 2,
                fontSize: "5vw",
              }}
            >
              To change the color of an item click on a box with a letter inside of it.
            </Typography>
          </Popover>
          <button onClick={handleClick} className="question-icon">
            <HelpOutlineIcon sx={{ fontSize: "10vw" }} />
          </button>
          <button className="reset-btn" onClick={() => this.setState({ ...initialState })}>
            Reset Grid
          </button>
          <div>{this.state.buttonPressed}</div>
        </div>
        <div className="div-grid-holder">
          <div>
            {this.state.gridList.map((row, rowIndex) => {
              return (
                <Grid container key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <Grid item key={colIndex} onClick={(_) => this.updateColorForPosition(rowIndex, colIndex)}>
                      <LetterSlot
                        inputRef={letterSlotRefs[rowIndex][colIndex]}
                        position={this.state.gridList[rowIndex][colIndex]}
                        onChange={(onChange: string) => this.inputChanged(rowIndex, colIndex, onChange)}
                        onKeyPressed={(onKeyPressed: string) => this.handleKeyPressed(rowIndex, colIndex, onKeyPressed)}
                      ></LetterSlot>
                    </Grid>
                  ))}
                </Grid>
              );
            })}
          </div>
          <div className="wordListDiv">
            <p>{this.state.wordList.join(" ")}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Kurdle;
