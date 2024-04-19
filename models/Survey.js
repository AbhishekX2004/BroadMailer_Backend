import mongoose from "mongoose";
import recipientSchema from "./Recipient.js"; // subdocument
const { Schema } = mongoose;

// schema telling what is held
const surveySchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },  // ('_' can be ignored, it just convention to tell it is a relationsal field) tells that it is for a particular user 
    title: String,
    body: String,
    subject: String,
    recipients: [recipientSchema],      // array of reciepients subdocument 
    yes: { type: Number, default: 0},   // count of number of votes from the end users
    no: { type: Number, default: 0},
    dateSent: Date,
    lastResponded: Date 
});
 
// tell mongoose about the model
export default mongoose.model('surveys', surveySchema);