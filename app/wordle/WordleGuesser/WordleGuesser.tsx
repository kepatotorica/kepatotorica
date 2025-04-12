"use client"
import React from "react"
import "./WordleGuesser.css"
import { Button } from "@nextui-org/button"
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react"

import { deepCopy } from "../../../Utilities/deepCopy"

import { Color, Position } from "./Position"
import { trimWords, words } from "./WordProcessor"
import LetterSlot from "./LetterSlot"

type MyState = {
  gridList: Position[][];
  wordList: string[];
  anchorEl: HTMLButtonElement | null;
};

const letterSlotRefs: React.RefObject<HTMLInputElement>[][] = Array.from(
  { length: 6 },
  () => Array(5).fill(React.createRef<HTMLInputElement>()),
)

function createStartingGrid(): Position[][] {
  let rows: Position[][] = new Array(6)

  for (let index = 0; index < rows.length; index++) {
    let columnPosition: number = 0

    rows[index] = Array(5)
      .fill(new Position("", -1, 0))
      .map((el: Position) => ({ ...el, Index: columnPosition++ }))
  }

  rows.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      letterSlotRefs[rowIndex] = letterSlotRefs[rowIndex] || []
      letterSlotRefs[rowIndex][colIndex] = React.createRef<HTMLInputElement>()
    })
  })

  return rows
}

const initialState: MyState = {
  gridList: createStartingGrid(),
  wordList: [],
  anchorEl: null,
}

class WordleGuesser extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      ...initialState,
    }
  }

  filterWords() {
    let calculatedWordList = words
    let greenLetters: Position[] = []

    this.state.gridList.forEach((row) => {
      row.forEach((letter) => {
        let overlappingLetters = greenLetters.filter(
          (greenLetter) => greenLetter.Letter === letter.Letter,
        )

        if (overlappingLetters.length > 0) {
          if (letter.Color !== Color.Grey) {
            // If we have a grey letter that is the same as a green then don't filter out words that only have one of that letter.
            //TODOASDF: if we have a yellow, and a green, then we need to only find words where there are both the green and another occurance of the same
            // letter in the word right now the way I have it written would mean making some changes to how the processing gets done. I am just a little too
            // lazy right now to fix that
            calculatedWordList = trimWords(letter, calculatedWordList)
          }
        } else {
          calculatedWordList = trimWords(letter, calculatedWordList)
        }

        if (letter.Color === Color.Green) {
          greenLetters = greenLetters.concat(letter)
        }
      })
    })
    
    this.setState({ wordList: calculatedWordList })
  }

  updateColorForPosition(row: number, col: number): void {
    let copiedGridOfLetters: Position[][] = deepCopy(this.state.gridList)
    const selectedLetter = copiedGridOfLetters[row][col]

    if (selectedLetter.Letter !== "") {
      if (++selectedLetter.Color > Color.Green) {
        selectedLetter.Color = Color.Grey
      }
      this.setState(
        { gridList: deepCopy(copiedGridOfLetters) },
        this.filterWords,
      )
    }
  }

  inputChanged(row: number, col: number, activeInput: string) {
    this.updateColorForPosition(row, col)
    let copiedGridOfLetters: Position[][] = deepCopy(this.state.gridList)
    const currentCell = copiedGridOfLetters[row][col]

    if (activeInput === "") {
      currentCell.Letter = ""
      currentCell.Color = Color.Nothing
    } else {
      currentCell.Letter = activeInput

      let setTheInitialColorWhenWeAddALetter =
        currentCell.Color === Color.Nothing

      if (setTheInitialColorWhenWeAddALetter) {
        currentCell.Color = Color.Grey
      }

      const nextRowIndex = row
      const nextColIndex = col + 1

      if (nextColIndex < this.state.gridList[nextRowIndex].length) {
        letterSlotRefs[nextRowIndex][nextColIndex].current?.focus()
      } else if (nextRowIndex < this.state.gridList.length - 1) {
        letterSlotRefs[nextRowIndex + 1][0].current?.focus()
      }
    }

    if (activeInput !== " ") {
      this.setState(
        { gridList: deepCopy(copiedGridOfLetters) },
        this.filterWords,
      )
    }
  }

  handleKeyPressed(row: number, col: number, keyPressed: string) {
    const currentCell = this.state.gridList[row][col]
    const shouldNavBack =
      keyPressed === "Backspace" && currentCell.Letter === ""

    if (shouldNavBack) {
      let prevRowIndex = row
      let prevColIndex = col - 1

      if (prevColIndex < 0) {
        prevColIndex = this.state.gridList[0].length - 1
        prevRowIndex--
      }
      if (prevRowIndex < 0) {
        prevRowIndex = 0
        prevColIndex = 0
      }
      letterSlotRefs[prevRowIndex][prevColIndex].current?.focus()
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            {this.state.gridList.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row-container">
                  {row.map((col, colIndex) => (
                    <LetterSlot
                      key={colIndex}
                      inputRef={letterSlotRefs[rowIndex][colIndex]}
                      position={this.state.gridList[rowIndex][colIndex]}
                      onChange={(onChange: string) =>
                        this.inputChanged(rowIndex, colIndex, onChange)
                      }
                      onClick={(_) =>
                        this.updateColorForPosition(rowIndex, colIndex)
                      }
                      onKeyPressed={(onKeyPressed: string) =>
                        this.handleKeyPressed(rowIndex, colIndex, onKeyPressed)
                      }
                    />
                  ))}
                </div>
              )
            })}
          </div>
          <div className="button-container">
            <Popover backdrop="blur" placement="bottom">
              <PopoverTrigger>
                <Button color="default">Instructions</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="instructions-text-container">
                  Fill out your letters how they appear on your wordle, then press
                  a cell to change its color. Then see valid words at the bottom
                  of the page. There is a known issue right now if there are
                  multiple of the same letter in a word. I have been too lazy to
                  fix this right now
                </div>
              </PopoverContent>
            </Popover>
            <Button
              color="danger"
              onClick={() => this.setState({ ...initialState })}
            >
              Reset Grid
            </Button>
          </div>
          <div className="wordListDiv">
            <p>{this.state.wordList.join(" ")}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default WordleGuesser
