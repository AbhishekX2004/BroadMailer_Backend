import mongoose from "mongoose";
const { Schema } = mongoose;

// schema telling what is held
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false}
});
 
// simple export
export default recipientSchema;

// tell mongoose about the model -- no need this is a sub document
// export default mongoose.model('surveys', recipientSchema);