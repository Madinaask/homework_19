import express from 'express'
import Book from '../models/Book.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('author').populate('genres')
    res.json(books)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author')
      .populate('genres')
    if (!book) {
      throw new Error('Книга не найдена')
    }
    res.json(book)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, author, genres, pages, publishedYear } = req.body
    if (!title || !author) {
      throw new Error('Поля "title" и "author" обязательны')
    }
    const book = await Book.create({ title, author, genres, pages, publishedYear })
    res.status(201).json(book)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!book) {
      throw new Error('Книга не найдена')
    }
    res.json(book)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      throw new Error('Книга не найдена')
    }
    res.json({ message: 'Книга удалена', book })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.post('/:id/reviews', async (req, res) => {
  try {
    const { reviewer, rating, comment } = req.body
    if (!reviewer || !rating) {
      throw new Error('Поля "reviewer" и "rating" обязательны')
    }
    const book = await Book.findById(req.params.id)
    if (!book) {
      throw new Error('Книга не найдена')
    }
    book.reviews.push({ reviewer, rating, comment })
    await book.save()
    res.status(201).json(book)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id/reviews/:reviewId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      throw new Error('Книга не найдена')
    }
    const review = book.reviews.id(req.params.reviewId)
    if (!review) {
      throw new Error('Отзыв не найден')
    }
    book.reviews.pull(req.params.reviewId)
    await book.save()
    res.json({ message: 'Отзыв удалён', book })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

export default router
