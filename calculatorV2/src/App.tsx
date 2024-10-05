import React, { useState, useRef } from "react";
import { EqualsButton, NumberButton, OperationButton } from "./Buttons.tsx";
import { ResultContext, OperationContext } from "./ResultContext.tsx";
import "./App.css";

export const operations = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  MOD: "%",
  POWER: "^",
  DIVISION: "/",
} as const;

function App() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");

  const [selectedOperation, setSelectedOperation] = useState<string>("");
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
          <NumberButton value="1" onClick={addValueToInput} />
          <NumberButton value="2" onClick={addValueToInput} />
          <NumberButton value="3" onClick={addValueToInput} />
          <NumberButton value="4" onClick={addValueToInput} />
        </div>
        <div>
          <NumberButton value="5" onClick={addValueToInput} />
          <NumberButton value="6" onClick={addValueToInput} />
          <NumberButton value="7" onClick={addValueToInput} />
          <NumberButton value="8" onClick={addValueToInput} />
        </div>

        <div>
          <NumberButton value="9" onClick={addValueToInput} />
          <OperationButton
            value={operations.ADDITION}
            onClick={handleOperationClick}
          />
          <OperationButton
            value={operations.SUBTRACTION}
            onClick={handleOperationClick}
          />
          <OperationButton
            value={operations.DIVISION}
            onClick={handleOperationClick}
          />
        </div>
        <div>
          <OperationButton
            value={operations.DIVISION}
            onClick={handleOperationClick}
          />
          <OperationButton
            value={operations.MOD}
            onClick={handleOperationClick}
          />
          <OperationButton
            value={operations.POWER}
            onClick={handleOperationClick}
          />

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
