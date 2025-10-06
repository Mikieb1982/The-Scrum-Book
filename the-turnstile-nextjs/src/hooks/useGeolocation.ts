"use client";

import { useCallback, useState } from "react";

type Position = {
  lat: number;
  lon: number;
};

type GeolocationError = {
  code: number;
  message: string;
};

const DEFAULT_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
};

const UNSUPPORTED_ERROR: GeolocationError = {
  code: 0,
  message: "Geolocation is not supported by this browser.",
};

export const useGeolocation = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeolocationError | null>(null);

  const requestLocation = useCallback((options?: PositionOptions) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setError(UNSUPPORTED_ERROR);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setError({ code: err.code, message: err.message });
        setIsLoading(false);
      },
      { ...DEFAULT_OPTIONS, ...options },
    );
  }, []);

  return { position, isLoading, error, requestLocation };
};
