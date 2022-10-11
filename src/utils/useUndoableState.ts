import { useMemo, useState } from "react";
import isEqual from "lodash/isEqual";

export default function useUndoableState<T>(initialState: T): {
  state: T;
  setState: (state: T) => void;
  resetState: (initialState: T) => void;
  isStateUndoable: () => boolean;
  undoState: () => void;
  isStateRedoable: () => boolean;
  redoState: () => void;
} {
  const [states, setStates] = useState<T[]>([initialState]),
    [index, setIndex] = useState<number>(0),
    state = useMemo<T>((): T => states[index], [states, index]);

  return {
    state,
    setState(newState: T): void {
      if (isEqual(state, newState)) {
        return;
      }

      const newStates = states.slice(0, index + 1);

      newStates.push(newState);

      setStates(newStates);
      setIndex(newStates.length - 1);
    },
    resetState(initialState: T): void {
      setStates([initialState]);
      setIndex(0);
    },
    isStateUndoable: (): boolean => index > 0,
    undoState: (): void => setIndex(index - 1),
    isStateRedoable: (): boolean => index < states.length - 1,
    redoState: (): void => setIndex(index + 1),
  };
}
