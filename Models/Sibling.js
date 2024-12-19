import mongoose, { Schema } from "mongoose";

//Relation 0 to many ou 1 to many ?? 
const siblingSchema = Schema({
    name: {
        type: String,
        required: String,
        unique: false,
    },
    last_name: String,
    age: Number,
    birthDate: {
        type: Date,
        validate: {
          validator: function(v) {
            v.setFullYear(v.getFullYear()+18)
            const currentTime = new Date();
            currentTime.setHours(0,0,0,0);
            return v.getTime() <= currentTime.getTime();
          },
        },
        required: true
    }
})

export default mongoose.model('Sibling', siblingSchema)