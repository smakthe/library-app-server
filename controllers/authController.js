import User from '../models/User.js'
import compare from 'bcrypt'
import sign from 'jsonwebtoken'


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password })
    await user.save()
    res.status(201).json({ message: 'User registered' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password' })
    const isMatch = await compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' })
    const token = sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export default [register, login]