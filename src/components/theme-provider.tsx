"use client"; // This MUST be the very first line of the file.

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  console.log("ThemeProvider: Running as client component."); // Debugging log
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
