import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { ThemeContext } from '../context/ThemeContext'
import { useContext } from 'react'

function Navbar() {
    const { isDark, toggleTheme } = useContext(ThemeContext)

    return (
        <nav className={styles.nav}>
            <span>Tomasz Młynik</span>

            <ul className={styles.list}>
                <li><Link to="/" className={styles.link}>O mnie</Link></li>
                <li><Link to="/projects" className={styles.link}>Projekty</Link></li>
                <li><Link to="/contact" className={styles.link}>Kontakt</Link></li>
            </ul>

            <button onClick={toggleTheme} className={styles.button}>
                {isDark ? 'Tryb jasny' : 'Tryb ciemny'}
            </button>
        </nav>
    )
}

export default Navbar