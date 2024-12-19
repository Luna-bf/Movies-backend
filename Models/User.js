import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    email: {
        type: String,
        required: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    last_name: String,
    password: {
        type: String,
        required: true,
        minLength: 4,
    }
})

export default mongoose.model('User', userSchema)