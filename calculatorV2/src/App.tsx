import React, { useState,useRef } from 'react'
import './App.css'
    
const operations = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  MOD: "%",
  POWER: "^",
  DIVISION: "/",

} as const 

function getResult(operation: string, a :number, b:number) : number {
  switch(operation) {
    case '+': return a+b;
    case '-': return a-b;
    case '*': return a*b;
    case '%': return a%b;
    case '^': return a**b;
    case '/': return a/b;
    default: return 0;
  }
} 

function App() {

  const [result, setResult] = useState<number>(0)
  const[firstInput, setFirstInput] = useState<string>('')
  const[secondInput, setSecondInput] = useState<string>('')

  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef =  useRef<HTMLInputElement>(null);

  const[selectedInput, setSelectedInput] = useState<React.RefObject<HTMLInputElement>>(firstInputRef);
  const[selectedOperation, setSelectedOperation] = useState<string>('');

  function OperationButton({value, operation} : {value:string, operation: string}) {
    return (
      <button onClick={() => {
        switchInput();
        setSelectedOperation(operation);

      }}> {value} </button>
    )

  }
  function EqualsButton() {
    return (
      <button onClick={
        () => {
          setResult(getResult(selectedOperation, Number(firstInput), Number(secondInput)))
          setFirstInput('');
          setSecondInput('');
          setSelectedInput(firstInputRef);
        }
      }>=</button>
    )
  }

  function NumberButton( {value }: {value: string} ) {
    return (
        <button
            onClick={() => {
              if(selectedInput === firstInputRef) 
                setFirstInput(i => i + value);
              else 
                setSecondInput(i => i + value);
            }
            }
        >
            {value}
        </button>
        );
  }

  function switchInput() {
    if(selectedInput === firstInputRef) 
      setSelectedInput(secondInputRef);
    else 
      setSelectedInput(firstInputRef);
  }

  return (
    <>
      <div>{result}</div>
      
      <input key={0} className={selectedInput === firstInputRef?undefined:'hidden'} value={firstInput} onChange={(e) => setFirstInput(e.target.value)} ref={firstInputRef} />
      <input key={1} className={selectedInput === firstInputRef?'hidden':undefined} value={secondInput} onChange={(e) => setSecondInput(e.target.value)} ref={secondInputRef} />
      
      
      
        <div><NumberButton value='1'/><NumberButton value='2'/><NumberButton value='3'/><NumberButton value='4'/></div>
        <div><NumberButton value='5'/><NumberButton value='6'/><NumberButton value='7'/><NumberButton value='8'/></div>
        <div><NumberButton value='9'/><OperationButton value='+' operation={operations.ADDITION}/><OperationButton value='-' operation={operations.SUBTRACTION}/><OperationButton value='/' operation={(operations.DIVISION)}/></div>
        <div>
          <OperationButton value='*' operation={operations.DIVISION}/><OperationButton value='%' operation={operations.MOD}/><OperationButton value='^' operation={operations.POWER}/><EqualsButton/>
          </div>

    </>
  )
}

export default App
