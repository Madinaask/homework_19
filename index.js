import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js'
import authorsRouter from './routes/authors.js'
import genresRouter from './routes/genres.js'
import booksRouter from './routes/books.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/genres', genresRouter)
app.use('/api/books', booksRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'API библиотеки',
    endpoints: {
      authors: '/api/authors',
      genres: '/api/genres',
      books: '/api/books',
    },
  })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' })
})

await connectDB(process.env.MONGO_URI)

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
})
