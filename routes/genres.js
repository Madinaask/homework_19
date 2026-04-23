import express from 'express'
import Genre from '../models/Genre.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find()
    res.json(genres)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id)
    if (!genre) {
      throw new Error('Жанр не найден')
    }
    res.json(genre)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name) {
      throw new Error('Поле "name" обязательно')
    }
    const genre = await Genre.create({ name, description })
    res.status(201).json(genre)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!genre) {
      throw new Error('Жанр не найден')
    }
    res.json(genre)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) {
      throw new Error('Жанр не найден')
    }
    res.json({ message: 'Жанр удалён', genre })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

export default router
