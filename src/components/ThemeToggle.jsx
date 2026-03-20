import React from 'react';
import useTheme from "../hooks/useTheme"
import "./ThemeToggle.css"

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      className={`theme-toggle ${isDark ? "dark" : ""}`}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="toggle-icon">{isDark ? "☾" : "☀"}</span>
      <span className="toggle-knob" />
    </button>
  )
}
