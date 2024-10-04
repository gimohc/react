import { createContext } from "react";

interface resultSet {
  operation: string | undefined;
  firstNumber: number | undefined;
  secondNumber: number | undefined;
}
export const ResultContext = createContext<resultSet | null>(null);
export const OperationContext = createContext<string | null>(null)
