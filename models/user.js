import mongoose from "mongoose";
const { Schema } = mongoose;

// schema telling what is held
const userSchema = new Schema({
    googleId: String
});

// tell mongoose about the model
export default mongoose.model('users', userSchema);