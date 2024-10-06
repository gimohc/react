import React, { useState, useRef } from "react";
import { EqualsButton, NumberButton, OperationButton } from "./Buttons.tsx";
import { ResultContext, OperationContext } from "./ResultContext.tsx";
import "./App.css";

export const operations = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  POWER: "^",
  DIVISION: "/",
} as const;

function App() {
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operationValues = Object.values(operations);
  let index = 0;

  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");

  const [selectedOperation, setSelectedOperation] = useState<string>("");

  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const [selectedInput, setSelectedInput] =
    useState<React.RefObject<HTMLInputElement>>(firstInputRef);

  function switchInput() {
    if (selectedInput === firstInputRef) setSelectedInput(secondInputRef);
    else setSelectedInput(firstInputRef);
  }
  function handleOperationClick(value: string) {
    setSelectedOperation(value);
    switchInput();
  }
  function addValueToInput(value: string) {
    if (selectedInput === firstInputRef) setFirstInput((i) => i + value);
    else setSecondInput((i) => i + value);
  }

  return (
    <ResultContext.Provider
      value={{
        operation: selectedOperation,
        firstNumber: Number(firstInput),
        secondNumber: Number(secondInput),
      }}
    >
      <input
        ref={firstInputRef}
        value={firstInput}
        className={selectedInput === firstInputRef ? undefined : "hidden"}
        onChange={(e) => setFirstInput(e.target.value)}
      />
      <input
        ref={secondInputRef}
        value={secondInput}
        className={selectedInput === firstInputRef ? "hidden" : undefined}
        onChange={(e) => setSecondInput(e.target.value)}
      />
      <div>
        {x.map((index) => {
          return (
            <>
              {index % 4 == 0 && <br />}
              <NumberButton
                value={String(index)}
                onClick={addValueToInput}
              ></NumberButton>
            </>
          );
        })}
        {operationValues.map((operation) => {
          return (
            <>
              {index++ === 2 && <br />}
              <OperationButton
                value={operation}
                onClick={handleOperationClick}
              />
            </>
          );
        })}

        <OperationContext.Provider value={selectedOperation}>
          <EqualsButton
            onClick={() => {
              if (firstInputRef.current && secondInputRef.current) {
                setFirstInput("");
                setSecondInput("");
                setSelectedInput(firstInputRef);
              }
            }}
          />
        </OperationContext.Provider>
      </div>
    </ResultContext.Provider>
  );
}

export default App;
