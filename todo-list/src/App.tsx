import { useState, useRef, useReducer } from "react";
import {
  ReducerFunctionContext,
  TasksContext,
  reducerFunction,
  ActionKind,
} from "./ReducerFunction";
import Input from "./EntryMap.tsx";
import "./App.css";

export interface State {
  entries: Entry[];
}

export interface Entry {
  id: number;
  title: string | undefined;
  editing: boolean;
  done: boolean;
}

function App() {
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [state, dispatch] = useReducer(reducerFunction, { entries: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddTaskClick() {
    if (inputRef.current) {
      dispatch({
        type: ActionKind.ADD,
        payload: {
          id: lastIndex,
          title: inputRef.current.value,
          editing: false,
          done: false,
        },
      });
      inputRef.current.value = "";
    }
    setLastIndex((n) => n + 1);
  }

  return (
    <>
      <TasksContext.Provider value={state}>
        <ReducerFunctionContext.Provider value={dispatch}>
          <h1> tasks </h1>
          <input ref={inputRef}></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddTaskClick();
            }}
          >
            Add Task
          </button>
          <ul>
            {state.entries.map((entry: Entry) => {
              if (!entry.done) return <Input entry={entry}></Input>;
            })}
            <h1> done </h1>
            {state.entries.map((entry) => {
              if (entry.done) return <li key={entry.id}>{entry.title}</li>;
            })}
          </ul>
        </ReducerFunctionContext.Provider>
      </TasksContext.Provider>
    </>
  );
}

export default App;
