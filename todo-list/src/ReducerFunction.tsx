import { createContext, Dispatch } from "react";
import { Entry, State } from "./App.tsx";

export const ActionKind = {
  REMOVE: "remove",
  ADD: "add",
  EDITING: "editing",
  EDITED: "edited",
} as const;

export interface Action {
  type: string;
  payload: Entry;
}
export function reducerFunction(state: State, action: Action): State {
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

export const TasksContext = createContext<State | null>(null);
export const ReducerFunctionContext = createContext<Dispatch<Action> | null>(
  null
);
