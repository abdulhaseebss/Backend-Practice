import express from 'express'
import Users from '../models/Users.mjs'
const router = express.Router()

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send({ data: users })
})

router.post('/register', async (req, res) => {
    try {
        await Users.create(req.body)

        res.send({ message: 'User registered successfully!'})
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

router.put('/login', async (req, res) => {
    const { email, password } = req.body

    //Step 1: Check if email exists
    const user = await Users.findOne({ email })

    if (!user) {
        res.status(404).send({ message: 'Email not found!' })
        return
    }

    //Step 2: Compare Password
    const isCorrectPassword = user.comparePassword(password)

    if (!isCorrectPassword) {
        res.status(404).send({ message: 'Password is incorrect!' })
        return
    }

    //Step 3: Generate Token

    res.send({ message: 'User logged in successfully!' })
    
})

export default router