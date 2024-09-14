import Book from '../models/Book.js'
import User from '../models/User.js'

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createBook = async (req, res) => {
  try {
    const book = new Book(req.body)
    await book.save()
    res.status(201).json(book)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    if (!book.available) return res.status(400).json({ message: 'Book is not available' })
    const user = await User.findById(req.user.id)
    book.available = false
    book.borrowedBy = user._id
    await book.save()
    user.borrowedBooks.push(book._id)
    await user.save()
    res.json({ message: 'Book borrowed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    const user = await User.findById(req.user.id)
    book.available = true
    book.borrowedBy = null
    await book.save()
    user.borrowedBooks.pull(book._id)
    await user.save()
    res.json({ message: 'Book returned successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default [getAllBooks, getBookById, createBook, borrowBook, returnBook]