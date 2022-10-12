import { useMemo, useState } from "react";
import isEqual from "lodash/isEqual";

export default function useUndoableState<T>(
  initialState: T
): [
  T,
  (state: T) => void,
  (initialState: T) => void,
  () => boolean,
  () => void,
  () => boolean,
  () => void
] {
  const [states, setStates] = useState<T[]>([initialState]),
    [index, setIndex] = useState<number>(0),
    state = useMemo<T>((): T => states[index], [states, index]);

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
    (): boolean => index > 0,
    (): void => setIndex(index - 1),
    (): boolean => index < states.length - 1,
    (): void => setIndex(index + 1),
  ];
}
