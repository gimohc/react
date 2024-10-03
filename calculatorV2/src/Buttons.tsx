import { useState, useContext } from "react";
import { SelectedInputContext } from "./SelectedInputContext.tsx";

function getResult(operation: string, a: number, b: number): number {
  switch (operation) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "%":
      return a % b;
    case "^":
      return a ** b;
    case "/":
      return a / b;
    default:
      return 0;
  }
}

export function OperationButton({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) {
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  return (
    <button
      onClick={() => {
        onClick();
        setSelectedOperation(value);
      }}
    >
      {" "}
      {value}{" "}
    </button>
  );
}
export function EqualsButton(onClick: () => void) {
  const [result, setResult] = useState<number>(0);
  const selectedInput = useContext(SelectedInputContext);
  return (
    <button
      onClick={() => {
        setResult(
          getResult(selectedOperation, Number(firstInput), Number(secondInput))
        );
      }}
    >
      =
    </button>
  );
}

export function NumberButton({ value }: { value: string }) {
  return (
    <button
      onClick={() => {
        if (selectedInput === firstInputRef) setFirstInput((i) => i + value);
        else setSecondInput((i) => i + value);
      }}
    >
      {value}
    </button>
  );
}
