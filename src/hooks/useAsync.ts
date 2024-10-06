import { useReducer, useRef, useEffect, useCallback } from "react";

type AsyncState<T> = {
  loading: boolean;
  error: unknown | null;
  value: T | null;
};

type Action<T> =
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: unknown };

const initialState = { loading: false, error: null, value: null };

const stateReducer = <T>(_: AsyncState<T>, action: Action<T>): AsyncState<T> => {
  switch (action.type) {
    case "start":
      return { loading: true, error: null, value: null };
    case "finish":
      return { loading: false, error: null, value: action.value };
    case "error":
      return { loading: false, error: action.error, value: null };
    default:
      return initialState;
  }
};

export default function useAsync<T>(fn: (...args: any[]) => Promise<T>) {
  const [state, dispatch] = useReducer(stateReducer<T>, initialState);

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const run = useCallback(
    async (...args: any[]) => {
      try {
        dispatch({ type: "start" });
        const value = await fn(...args);
        dispatch({ type: "finish", value });
        return value;
      } catch (error) {
        dispatch({ type: "error", error });
      }
    },
    [fn]
  );

  return { ...state, run };
}
