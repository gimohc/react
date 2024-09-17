import { useState } from "react";
import { useReducer } from "react";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { Profile } from "./Profile.tsx";
import "./App.css";

interface Entry {
  id: number;
  title: string;
  editing: boolean;
}
interface State {
  entries: Entry[];
}

enum ActionKind {
  REMOVE = "REMOVE",
  ADD = "add",
  EDITING = "editing",
  EDITED = "edited",
}
interface Action {
  type: ActionKind;
  payload: Entry;
}
function entryReducer(state: State, action: Action): State {
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
          return {...entry}
        }),
      };
    case ActionKind.REMOVE:
      return {
        ...state,
        entries: state.entries.filter(
          (entry) => entry.id !== action.payload.id
        ),
      };
    case ActionKind.EDITED:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry = action.payload;
            entry.editing = false;
          }
          return {...entry}
        }),
      };
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

function App() {
  const [lastIndex, setLastIndex] = useState<number>(0);
  const [state, dispatch] = useReducer(entryReducer, { entries: [] });
  const [doneState, update] = useReducer(entryReducer, { entries: [] });

  function handleAddTaskClick() {
    const input = (document.getElementById("text") as HTMLInputElement).value;
    dispatch({
      type: ActionKind.ADD,
      payload: { id: lastIndex, title: input, editing: false },
    });
    setLastIndex((n) => n + 1);
  }

  return (
    <>
      <h1>tasks</h1>
      <input id="text"></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddTaskClick();
        }}
      >
        Add Task
      </button>
      <ul>
        {state.entries.map((entry: Entry) => (
          <li key={entry.id}>
            {entry.editing ? (
              <>
                <input
                  id={"text" + entry.id}
                  defaultValue={entry.title}
                ></input>
                <button
                  onClick={() => {
                    dispatch({
                      type: ActionKind.EDITED,
                      payload: {
                        ...entry,
                        title: (
                          document.getElementById(
                            "text" + entry.id
                          ) as HTMLInputElement
                        ).value,
                      },
                    });
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {entry.title}
                <button
                  onClick={() => {
                    dispatch({
                      type: ActionKind.EDITING,
                      payload: entry,
                    });
                  }}
                >
                  {" "}
                  edit{" "}
                </button>
              </>
            )}
            <button
              onClick={() => {
                dispatch({
                  type: ActionKind.REMOVE,
                  payload: entry,
                });
                update({
                  type: ActionKind.ADD,
                  payload: entry,
                });
              }}
            >
              done
            </button>
          </li>
        ))}
      </ul>
      <ul>
        <h1> done </h1>
        {doneState.entries.map((entry) => (
          <li key={entry.id}>{entry.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
