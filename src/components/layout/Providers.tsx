"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  /** plays a named cue if sound is enabled; safe no-op otherwise */
  cue: (name: "click" | "scan" | "success") => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const storedTheme = (localStorage.getItem("horsevision:theme") as Theme | null) ?? "dark";
    const storedSound = localStorage.getItem("horsevision:sound") === "on";
    setTheme(storedTheme);
    setSoundEnabled(storedSound);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("horsevision:theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((s) => {
      const next = !s;
      localStorage.setItem("horsevision:sound", next ? "on" : "off");
      return next;
    });
  }, []);

  /**
   * Sound architecture is ready: cues are dispatched here. We synthesise soft
   * tones with the Web Audio API so no asset files are required. Disabled by default.
   */
  const cue = useCallback(
    (name: "click" | "scan" | "success") => {
      if (!soundEnabled || typeof window === "undefined") return;
      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freq = name === "success" ? 660 : name === "scan" ? 420 : 520;
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } catch {
        /* ignore */
      }
    },
    [soundEnabled],
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, soundEnabled, toggleSound, cue }),
    [theme, toggleTheme, soundEnabled, toggleSound, cue],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within <Providers>");
  return ctx;
}
