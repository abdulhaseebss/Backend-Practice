import express from 'express'
import Users from '../models/Users.mjs'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const user = new Users(req.body)
        await user.save()

        res.send({ message: "User registered successfully!" })
    } catch (e) {
        res.send({ message: e.message })
    }

})

router.get('/', async (req, res) => {
    const users = await Users.find()

    res.send({ message: "Data fetched successfully", data: users })
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //Step 1: Check if email exists
        const user = await Users.findOne({ email })

        if (!user) {
            res.send({ message: "User not found!" })
            return
        }

        //Step 2: Compare the passwords
        const isCorrectPassword = user.comparePassword(password)

        if (!isCorrectPassword) {
            res.send({ message: "Invalid Password" })
            return
        }

        //Step 3: Generate Token

        res.send({ message: "User logged in successfully!" })
    } catch (e) {
        res.send({ message: e.message })
    }

})

export default router