import { createContext, useState, type ReactNode } from 'react'
// importowanie funkcji do dekodowania tokenu JWT
interface User {
  userId: number
  role: string
}
// interfejs dla kontekstu autoryzacji
interface AuthContextType {
  token: string | null
  user: User | null
  login: (token: string) => void
  logout: () => void
}
// funkcja do dekodowania tokenu JWT i wyciągania z niego informacji o użytkowniku
function decodeToken(token: string | null): User | null {
  if (!token) {
    return null
  }

  try {
    const payload = token.split('.')[1]

    if (!payload) {
      return null
    }

    return JSON.parse(atob(payload)) as User
  } catch {
    return null
  }
}
// pobieranie tokenu z localStorage, jeśli istnieje
const storedToken = localStorage.getItem('token')
// tworzenie kontekstu autoryzacji z domyślnymi wartościami
export const AuthContext = createContext<AuthContextType>({
  token: storedToken,
  user: decodeToken(storedToken),
  login: () => {},
  logout: () => {}
})
// komponent dostarczający kontekst autoryzacji dla całej aplikacji
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(storedToken)

  const [user, setUser] = useState<User | null>(() =>
    decodeToken(storedToken)
  )
  // funkcja logowania, która zapisuje token i informacje o użytkowniku w stanie i localStorage
  function login(newToken: string) {
    const decodedUser = decodeToken(newToken)

    if (!decodedUser) {
      return
    }

    setToken(newToken)
    setUser(decodedUser)
    localStorage.setItem('token', newToken)
  }

  // funkcja wylogowywania, która usuwa token i informacje o użytkowniku ze stanu i localStorage
  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext