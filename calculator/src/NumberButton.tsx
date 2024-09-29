import React, { useContext } from "react";
import { CurrentContext } from "./App";

export function NumberButton( {value }: {value: string} ) {
    const ref = useContext<React.RefObject<HTMLInputElement> | null>(CurrentContext);
    return (
        <button
            onClick={() => {
            if (ref && ref.current) 
                ref.current.value += value;
            }}
        >
            {value}
        </button>
        );
}
  
    
  
