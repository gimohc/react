import { useState, useContext } from "react";
import { ActionKind, Entry } from "./App";
import { ReducerFunctionContext } from "./ReducerFunction";
export default function Input( { entry } : {entry : Entry } ) {

    const dispatch = useContext(ReducerFunctionContext);

    const [value, setValue] = useState<string>("");
    if(dispatch)
        if(entry.editing)
            return (
                <>

                <input value={value} onChange={(e) => setValue(e.target.value)}></input>
                <button onClick={() => {
                    
                    dispatch({
                        type : ActionKind.EDITED,
                        payload : {
                            ...entry,
                            title: value
                        }
                    })
                    
                    
                    }}> save </button>
                </>
            )
        else {
            return (
                <>
                    <li> {entry.title}
                    <button onClick={() => {
                        dispatch({
                            type: ActionKind.EDITING,
                            payload: {
                                ...entry, 

                            }
                        })
                        
                    }}> edit </button>
                    <button onClick={() => {
                        dispatch({
                            type: ActionKind.REMOVE,
                            payload: {
                                ...entry
                            }
                        })
                
                    }}> done </button>
                    </li>
                </>
            )

        }
    


}
