const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formulateSchema = new Schema({
    patientId: { type : String, required: false },
    date : {  type : Date, default: Date.now },
    predisposing : { type: String, required: false},
    precipitating : { type: String, required: false},
    perpetuating : { type: String, required: false},
    protective : { type: String, required: false},
    meta : [ { 
        practiceID : String,
        externalID : Number,
        provider : String
    }]
    }, {
    timestamps: true,
});

const Formulate = mongoose.model('Formulate', formulateSchema);

module.exports = Formulate;