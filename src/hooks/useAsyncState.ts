import {useCallback, useEffect, useRef, useState} from "react";

export const useAsyncState = <S = undefined>(
  initialState: S | (() => S),
): [S, (state: S | ((prevState: S) => S)) => Promise<S>, S | undefined] => {
  const [state, setState] = useState<S>(initialState);
  const resolve = useRef<(value: S | PromiseLike<S>) => void>();
  const stateRef = useRef<S>();
  useEffect(() => {
    // 当值发生改变时 执行resolve方法并把最新的值传递出去
    if (resolve.current) {
      resolve.current(state);
    }
    stateRef.current = state;
  }, [state]);
  const changeState = useCallback((state: S | ((prevState: S) => S)) => {
    // 直接返回一个Promise
    return new Promise<S>((res) => {
      //将Promise的resolve方法存起
      resolve.current = res;
      //设置值
      setState(state);
    });
  }, []);
  return [state, changeState, stateRef.current];
};
