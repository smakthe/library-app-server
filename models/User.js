import { Schema, model } from 'mongoose'
import { hash } from 'bcrypt'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'librarian', 'admin'], default: 'user' },
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await hash(this.password, 10)
  next()
})

export default model('User', userSchema)