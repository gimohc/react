import React, { useState, useRef, createContext } from 'react'
import { NumberInput  } from './NumberInput';
import { NumberButton } from './NumberButton';
import './App.css'

export const CurrentContext = createContext<React.RefObject<HTMLInputElement> | null>(null);
function App() {
  const [result, setResult] = useState<number>(0);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const [selected, setSelected] = useState<React.RefObject<HTMLInputElement>>(firstInputRef);
  const [selectedOperation, setSelectedOperation] = useState<((a:number, b:number) => number) | null>(null);
  function switchInput() {
    if(selected === firstInputRef) 
      setSelected(secondInputRef);
    else 
      setSelected(firstInputRef);
  }
  function OperationButton({value, operation} : {value:string, operation: (a:number, b:number) => number}) {
    return (
      <button onClick={() => {
        switchInput();
        setSelectedOperation(operation);
      }}> {value} </button>
    )

  }
  function e () {
    if(firstInputRef.current && secondInputRef.current) {
      const firstValue = Number(firstInputRef.current.value);
      const secondValue = Number(secondInputRef.current.value); 
      if(selectedOperation)
        setResult(selectedOperation(firstValue,secondValue));
      else 
        setResult(firstValue);
      
      console.log(firstValue);
      console.log(secondValue);
      
    }
    else console.log("NO")
  }
  function EqualsButton() {

    return <button onClick={e}> = </button>
  }



  return (
    <>
      <div>{result}</div>
      {
      selected === firstInputRef?   
      <NumberInput key={0} ref={firstInputRef}/>:
      <NumberInput key={1} ref={secondInputRef}/>
      }
      
      <CurrentContext.Provider value = {selected}>
        <div><NumberButton value='1'/><NumberButton value='2'/><NumberButton value='3'/><NumberButton value='4'/></div>
        <div><NumberButton value='5'/><NumberButton value='6'/><NumberButton value='7'/><NumberButton value='8'/></div>
        <div><NumberButton value='9'/><OperationButton value='+' operation={(a,b) => a+b}/><OperationButton value='-' operation={(a,b) => a-b}/><OperationButton value='/' operation={(a,b) => a/b}/></div>
        <div>
          <OperationButton value='*' operation={(a,b) => a*b}/><OperationButton value='%' operation={(a,b) => a%b}/><OperationButton value='^' operation={(a,b) => a^b}/><EqualsButton/>
          </div>

      </CurrentContext.Provider>

    </>
  )
}



export default App
