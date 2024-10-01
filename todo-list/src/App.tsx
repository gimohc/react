import { useState, useRef, useReducer } from "react";
import {
  ReducerFunctionContext,
  TasksContext,
  Action,
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

export const ActionKind = {
  REMOVE: "remove",
  ADD: "add",
  EDITING: "editing",
  EDITED: "edited",
} as const;

function App() {
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [state, dispatch] = useReducer(reducerFunction, { entries: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  function handleAddTaskClick() {
    dispatch({
      type: ActionKind.ADD,
      payload: {
        id: lastIndex,
        title: inputRef.current?.value,
        editing: false,
        done: false,
      },
    });
    if (inputRef.current) inputRef.current.value = "";
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
          </ul>
          <ul>
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

function reducerFunction(state: State, action: Action): State {
  switch (action.type) {
    case ActionKind.ADD:
      return { ...state, entries: [...state.entries, action.payload] };
    case ActionKind.EDITING:
      return {
        ...state,
        entries: state.entries.map((entry: Entry) => {
          if (entry.id === action.payload.id) {
            entry.editing = true;
          }
          return { ...entry };
        }),
      };
    case ActionKind.REMOVE:
      return {
        ...state,
        entries: state.entries.map((entry: Entry) => {
          if (entry.id === action.payload.id) entry.done = true;
          return { ...entry };
        }),
      };
    case ActionKind.EDITED:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry = action.payload;
            entry.editing = false;
          }
          return { ...entry };
        }),
      };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export default App;
