import { useCallback, useEffect, useRef, useState } from "react"

export const useCallbackState = <S = undefined>(
  initialState: S | (() => S)): [S, (state: S | ((prevState: S) => S),callback?:(state:S)=>unknown) => void] => { 
  const [state, setState] = useState(initialState)
  const callbackRef = useRef<(state: S) => unknown>()
  useEffect(() => { 
    // 当state发生改变，若保存的回调函数存在执行回调函数并将最新的值传出
    if(typeof callbackRef.current == "function"){callbackRef.current(state)}
  },[state])
  const changeState = useCallback((state: S | ((prevState: S) => S), callback?: (state: S) => unknown) => {
    //若存在回调函数那么保存回调函数
    if (typeof callback === "function") { callbackRef.current = callback }
    //设置值
    setState(state)
  },[])
  return [state,changeState]
  }