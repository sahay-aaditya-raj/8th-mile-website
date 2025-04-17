"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export default function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }
  
  return (
    <div>
      
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <Moon className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button><br/>
    <p className="text-destructive">Hello</p>
    </div>
  )
}