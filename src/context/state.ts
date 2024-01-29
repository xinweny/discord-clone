import { createContext, useContext} from 'react';

export type StateContextData = [
  any,
  React.Dispatch<React.SetStateAction<any>>,
];

export const StateContext = createContext<StateContextData | null>(null);

export const useStateContext = () => useContext(StateContext);