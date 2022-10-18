import { useMemo, useState } from "react";
import isEqual from "lodash/isEqual";

export default function useUndoableState<T>(
  initialState: T
): [
  T,
  (state: T) => void,
  (initialState: T) => void,
  () => boolean,
  () => T,
  () => boolean,
  () => T
] {
  const [states, setStates] = useState<T[]>([initialState]),
    [index, setIndex] = useState<number>(0),
    state = useMemo<T>((): T => states[index], [states, index]);

  const isStateUndoable = (): boolean => index > 0,
    isStateRedoable = (): boolean => index < states.length - 1;

  return [
    state,
    (newState: T): void => {
      if (isEqual(state, newState)) {
        return;
      }

      const newStates = states.slice(0, index + 1);

      newStates.push(newState);

      setStates(newStates);
      setIndex(newStates.length - 1);
    },
    (initialState: T): void => {
      setStates([initialState]);
      setIndex(0);
    },
    isStateUndoable,
    (): T => {
      if (!isStateUndoable()) {
        throw new Error("State is not undo-able.");
      }

      const newIndex = index - 1;

      setIndex(newIndex);

      return states[newIndex];
    },
    isStateRedoable,
    (): T => {
      if (!isStateRedoable()) {
        throw new Error("State is not redo-able.");
      }

      const newIndex = index + 1;

      setIndex(newIndex);

      return states[newIndex];
    },
  ];
}
