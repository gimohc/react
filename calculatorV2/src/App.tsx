import React, { useState, useRef } from "react";
import { EqualsButton, NumberButton, OperationButton } from "./Buttons.tsx";
import { InputElement } from "./InputElement.tsx";
import { SelectedInputContext } from "./SelectedInputContext.tsx";
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

  return (
    <SelectedInputContext.Provider value={selectedInput}>
      <InputElement
        key="0"
        ref={firstInputRef}
        className={selectedInput === firstInputRef ? undefined : "hidden"}
      />
      <InputElement
        key="1"
        ref={secondInputRef}
        className={selectedInput === firstInputRef ? "hidden" : undefined}
      />

      <div>
        <NumberButton value="1" />
        <NumberButton value="2" />
        <NumberButton value="3" />
        <NumberButton value="4" />
      </div>
      <div>
        <NumberButton value="5" />
        <NumberButton value="6" />
        <NumberButton value="7" />
        <NumberButton value="8" />
      </div>

      <div>
        <NumberButton value="9" />
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
          <ResultContext.Provider
            value={{
              operation: selectedOperation,
              firstNumber: Number(firstInputRef.current?.value),
              secondNumber: Number(secondInputRef.current?.value),
            }}
          >
            <EqualsButton
              onClick={() => {
                if (firstInputRef.current && secondInputRef.current) {
                  firstInputRef.current.value = "";
                  secondInputRef.current.value = "";
                  setSelectedInput(firstInputRef);
                }
              }}
            />
          </ResultContext.Provider>
        </OperationContext.Provider>
      </div>
    </SelectedInputContext.Provider>
  );
}

export default App;
