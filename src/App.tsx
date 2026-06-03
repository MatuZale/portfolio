import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'

function App() {

  const [isDark, setIsDark] = useState(
    localStorage.getItem('isDark') === 'true'
  )

  useEffect(() => {
    localStorage.setItem('isDark', isDark.toString())
  }, [isDark])

  return (
      <div className={isDark ? 'dark' : 'light'}>
      <button onClick={() => setIsDark(!isDark)}> 
        {isDark ? 'Tryb jasny' : 'Tryb ciemny'}
      </button>
      <Navbar />
      <About name="Tomasz" description="Cześć! Jestem Tomasz, pasjonuję się tworzeniem stron internetowych i programowaniem. Mam doświadczenie w React, JavaScript i CSS. Lubię uczyć się nowych technologii i rozwijać swoje umiejętności." />
    </div>
  )
}

export default App
