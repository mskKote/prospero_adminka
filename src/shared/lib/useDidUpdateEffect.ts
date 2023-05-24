import { useRef, useEffect, EffectCallback, DependencyList } from "react";

export const useDidUpdateEffect = (fn: EffectCallback, inputs: DependencyList | undefined) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}