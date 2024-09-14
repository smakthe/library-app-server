import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  language: { type: String },
  available: { type: Boolean, default: true },
  borrowedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  format: { type: String, enum: ['physical', 'ebook', 'audiobook'] },
  rating: { type: Number, min: 1, max: 5 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
})

export default model('Book', bookSchema)