import {useCallback, useEffect, useRef, useState} from "react";

export const useAsyncState = <S = undefined>(
  initialState: S | (() => S),
): [S, (state: S | ((prevState: S) => S)) => Promise<S>, S | undefined] => {
  const [state, setState] = useState<S>(initialState);
  const resolve = useRef<(value: S | PromiseLike<S>) => void>();
  const stateRef = useRef<S>();
  useEffect(() => {
    if (resolve.current) {
      resolve.current(state);
      resolve.current = undefined;
    }
    stateRef.current = state;
  }, [state]);
  const changeState = useCallback((state: S | ((prevState: S) => S)) => {
    return new Promise<S>((res) => {
      resolve.current = res;
      setState(state);
    });
  }, []);
  return [state, changeState, stateRef.current];
};
