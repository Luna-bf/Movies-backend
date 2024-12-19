import Sibling from '../Models/Sibling.js'

export const siblingCreation = (req, res, next) => {
    const { name, last_name, age, birthDate } = req.body

    if (name, last_name, age, birthDate) {
        return res.json({ message: 'All fields are required' })
    }
    next()
}