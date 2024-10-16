"use client";
import { Color, Position } from "./Position";

type myProps = {
  position: Position;
  onChange: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onKeyPressed: (key: string) => void;
  onClick: (_: any) => void;
};

function colorPicker(Accuracy: number): string {
  switch (Accuracy) {
    case Color.Grey:
      return "#2c3032";
    case Color.Yellow:
      return "#917f2f";
    case Color.Green:
      return "#42713e";
    default:
      return "#121212";
  }
}

function LetterSlot(props: myProps) {
  return (
    <input
      ref={props.inputRef}
      className={`letter-slot`}
      data-color={props.position.Color === Color.Nothing ? "nothing" : ""}
      inputMode="text"
      style={{ background: colorPicker(props.position.Color) }}
      value={props.position.Letter}
      onChange={(e) =>
        props.onChange(e.currentTarget.value.toUpperCase().trim().at(-1) || "")
      }
      onClick={(e) => props.onClick(e)}
      onKeyUp={(e) => props.onKeyPressed(e.key)}
    />
  );
}

export default LetterSlot;
