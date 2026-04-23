import express from 'express'
import Author from '../models/Author.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find()
    res.json(authors)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    if (!author) {
      throw new Error('Автор не найден')
    }
    res.json(author)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, bio, birthYear, country } = req.body
    if (!name) {
      throw new Error('Поле "name" обязательно')
    }
    const author = await Author.create({ name, bio, birthYear, country })
    res.status(201).json(author)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!author) {
      throw new Error('Автор не найден')
    }
    res.json(author)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
    if (!author) {
      throw new Error('Автор не найден')
    }
    res.json({ message: 'Автор удалён', author })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})

export default router
