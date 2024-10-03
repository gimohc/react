import { createContext } from "react";

export const SelectedInputContext =
  createContext<React.RefObject<HTMLInputElement> | null>(null);
