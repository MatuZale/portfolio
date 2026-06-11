// backend/index.js
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// importowanie bazy danych
const db = require('./database')
// tworzenie instancji aplikacji Express
const app = express()
// sekret do podpisywania tokenów JWT
const JWT_SECRET = 'your-secret-key'

// middleware
app.use(cors())
app.use(express.json())

// middleware do ochrony endpointów wymagających autoryzacji
function requireAuth(req, res, next) {
  // pobieranie tokenu z nagłówka Authorization
  const authHeader = req.headers['authorization']
  // sprawdzanie, czy nagłówek Authorization jest obecny
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }
  // token jest w formacie "Bearer <token>"
  const token = authHeader.split(' ')[1]
  // sprawdzanie, czy token jest obecny
  if (!token) {
    return res.status(401).json({ error: 'Token missing' })
  }
  // weryfikacja tokenu JWT
  try {
    // jeśli token jest poprawny, dodajemy informacje o użytkowniku do obiektu req i przechodzimy do następnego middleware lub endpointu
    const decoded = jwt.verify(token, JWT_SECRET)
    // dodajemy informacje o użytkowniku do obiektu req, aby można było je wykorzystać w dalszej części aplikacji
    req.user = decoded
    // przechodzimy do następnego middleware lub endpointu
    next()
  } 
  // obsługa błędów w przypadku nieprawidłowego tokenu
  catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

app.post('/api/users', async (req, res) => {
  // pobieranie danych z żądania
  const { email, password } = req.body

  // sprawdzanie, czy użytkownik już istnieje w bazie danych
  const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' })
  }

  // hashing hasła przed zapisaniem do bazy danych
  const hashedPassword = await bcrypt.hash(password, 10)

  // zapisywanie nowego użytkownika do bazy danych
  const stmt = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)')
  const info = stmt.run(email, hashedPassword, 'user')

  // zwracanie ID nowo utworzonego użytkownika
  res.json({ id: info.lastInsertRowid })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  // sprawdzanie, czy użytkownik istnieje w bazie danych
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  // porównywanie hasła z hashem w bazie danych
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid email or password' })
  }

  // generowanie tokenu JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  )

  res.json({ token })
})

app.post('/api/posts', requireAuth, async (req, res) => {
  // pobieranie danych z żądania
  const { title, content } = req.body
  const userId = req.user.userId

  if (req.user.role === 'admin') {
    // zapisywanie nowego posta do bazy danych
    const stmt = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)')
    const info = stmt.run(title, content, userId)

    // zwracanie ID nowo utworzonego posta
    res.json({ id: info.lastInsertRowid })
  } else {
    res.status(403).json({ error: 'Forbidden: Only admins can create posts' })
  }
})

app.get('/api/posts', async (req, res) => {
  // pobieranie wszystkich postów z bazy danych
  const posts = db.prepare('SELECT * FROM posts').all()
  res.json(posts)
})

app.get('/api/posts/:id', async (req, res) => {
  const postId = req.params.id
  // pobieranie posta o określonym ID z bazy danych
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId)
  if (post) {
    res.json(post)
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

app.delete('/api/posts/:id', requireAuth, async (req, res) => {
  const postId = req.params.id
  const userId = req.user.userId

  // pobieranie posta o określonym ID z bazy danych
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId)
  if (!post) {
    return res.status(404).json({ error: 'Post not found' })
  }

  // sprawdzanie, czy użytkownik jest autorem posta lub ma rolę admina
  if (post.user_id === userId || req.user.role === 'admin') {
    // usuwanie posta z bazy danych
    db.prepare('DELETE FROM posts WHERE id = ?').run(postId)
    res.json({ message: 'Post deleted successfully' })
  } else {
    res.status(403).json({ error: 'Forbidden: You can only delete your own posts or you must be an admin' })
  }
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})