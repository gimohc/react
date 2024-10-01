import { createContext, Dispatch } from "react";
import { Entry, State } from "./App.tsx";

  
  export interface Action {
    type: string;
    payload: Entry;
  }  

export const TasksContext = createContext<State | null>(null); 
export const ReducerFunctionContext =  createContext<Dispatch<Action> | null>(null);

