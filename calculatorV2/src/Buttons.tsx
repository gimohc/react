import { useState, useContext } from "react";
import { ResultContext } from "./ResultContext.tsx";
import "./App.css";
function getResult(
  operation: string | undefined,
  a: number | undefined,
  b: number | undefined
): number {
  if (operation && a && b)
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
    }
  return 0;
}

export function OperationButton({
  value,
  onClick,
}: {
  value: string;
  onClick: (value: string) => void;
}) {
  return (
    <button className="button" onClick={() => onClick(value)}>
      {value}
    </button>
  );
}
export function EqualsButton({ onClick }: { onClick: () => void }) {
  const [result, setResult] = useState<number>(0);
  const results = useContext(ResultContext);
  return (
    <>
      <button
        className="button"
        onClick={() => {
          onClick();
          setResult(
            getResult(
              results?.operation,
              results?.firstNumber,
              results?.secondNumber
            )
          );
        }}
      >
        {"="}
      </button>
      <div> {result} </div>
    </>
  );
}

export function NumberButton({
  value,
  onClick,
}: {
  value: string;
  onClick: (value: string) => void;
}) {
  return (
    <button className="button" onClick={() => onClick(value)}>
      {value}{" "}
    </button>
  );
}
