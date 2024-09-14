import { Router } from 'express'
import bookMethods from '../controllers/bookController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const bookRouter = Router()

const [ getAllBooks, getBookById, createBook, borrowBook, returnBook ] = bookMethods

// Get all books
bookRouter.get('/', getAllBooks)

// Get book by ID
bookRouter.get('/:id', getBookById)

// Create a new book
bookRouter.post('/', createBook)

// Borrow a book
bookRouter.post('/:id/borrow', authMiddleware, borrowBook)

// Return a book
bookRouter.post('/:id/return', authMiddleware, returnBook)

export default bookRouter