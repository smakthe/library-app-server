import express, { json } from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import mongoConnect from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import bookRoutes from './routes/bookRoutes.js'


// Load environment variables
config()

// Start express app
const app = express()

// Middleware
app.use(json())
app.use(cors())

// Connect to MongoDB
mongoConnect()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server started on port', PORT))