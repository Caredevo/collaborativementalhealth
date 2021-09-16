const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    patientId: { type : String, required: false },
    date : {  type : Date, default: Date.now },
    review : { type: String, required: false},
    mse : { type: String, required: false},
    risk : { type: String, required: false},
    assessment : { type: String, required: false},
    tools : { type: String, required: false},
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;