"use client";

import { useLayoutEffect, useState } from "react";

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {},
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    setMatches(matchMedia.matches);

    const listener = (event: MediaQueryListEvent) => handleChange(event);

    if (matchMedia.addEventListener) {
      matchMedia.addEventListener("change", listener);
    } else {
      matchMedia.addListener(listener);
    }

    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener("change", listener);
      } else {
        matchMedia.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
