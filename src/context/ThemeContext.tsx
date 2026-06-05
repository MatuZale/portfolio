import { createContext, useState, type ReactNode } from 'react'

interface ThemeContextType {
    isDark: boolean,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [isDark, setIsDark] = useState(
        localStorage.getItem('isDark') === 'true'
    )
    
    function toggleTheme() {
        setIsDark(prev => {
            const newValue = !prev
            localStorage.setItem('isDark', newValue.toString())
            return newValue
        })
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}