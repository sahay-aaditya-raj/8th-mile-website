"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function ThemeTogglerButton() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }
  
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} asChild>
        <div className="hover:scale-110 transition-transform duration-200 hover:cursor-pointer">
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden hover:cursor-pointer" />
          <Moon className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:block hover:cursor-pointer" />
          <span className="sr-only hover:cursor-pointer">Toggle theme</span>
        </div>
    </Button>
  )
}