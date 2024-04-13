import mongoose from "mongoose";
const { Schema } = mongoose;

// schema telling what is held
const userSchema = new Schema({
    googleId: String,   // type of field
    credits: { type: Number, default: 0 }       // for other configuration assign an object
});

// tell mongoose about the model
export default mongoose.model('users', userSchema);